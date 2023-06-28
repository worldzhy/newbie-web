import React, { type ReactElement, type FC, useEffect, useState } from 'react';
import Permission from '@/shared/libs/permission';
import { sendRequest, showError } from '@/shared/libs/mixins';
import FormDialogCustom from '@/components/FormDialogCustom';
import TablePermission from './Table';

/**
 *
 * Table responsible for showing the per role (as identified by roleId) permissions against resources.
 * To use this table, provide roleId in props. This component will do the data fetching of the permissions here.
 * This component is used in Team > Roles > Edit page.
 *
 **/

/**
 * Types
 */

interface Props {
  activeRole: IActiveRole;
  setActiveRole: React.Dispatch<React.SetStateAction<IActiveRole>>;
}

type IActiveRole = {
  id: string;
  name: string;
} | null;

interface IRequest {
  change: 'add' | 'delete';
  resourceId: number | null;
  resource: string;
  action: string;
  roleId: string;
}

interface IPermissionByResource {
  resource: string;
  permissions: Array<{
    id: number | null;
    action: string;
    allow: boolean;
  }>;
}

const RolesPermissions: FC<Props> = ({
  activeRole,
  setActiveRole,
}): ReactElement => {
  /**
   * States
   */
  const [data, setData] = useState<IPermissionByResource[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [requests, setRequests] = useState<Map<string, IRequest>>(new Map());

  /**
   * Handlers
   */
  const updatePermissions = async (): Promise<void> => {
    await sendRequest(setIsProcessing, async () => {
      await new Permission().update(requests);
    });
    setRequests(new Map());
    // To do: Add permission id to data after creating new permission
  };

  const checkBoxOnChangeHandler = (
    resource: string,
    action: string,
    id: number | null
  ): void => {
    const updatedData = data.map((d) => {
      if (d.resource === resource) {
        const actionIndex = d.permissions.findIndex((p) => p.action === action);
        d.permissions[actionIndex].allow = !d.permissions[actionIndex].allow;
      }
      return d;
    });
    setData(updatedData);

    const isAdd = data
      .find((d) => d.resource === resource)
      ?.permissions.find((p) => p.action === action)?.allow;
    if (isAdd === undefined) {
      return;
    }
    const requestId = `${resource}-${action}`;
    if (requests?.has(requestId)) {
      requests.delete(requestId);
    } else {
      requests?.set(requestId, {
        change: isAdd ? 'add' : 'delete',
        resourceId: id,
        resource,
        action,
        roleId: activeRole?.id as string,
      });
    }
    setRequests(requests);
  };

  /**
   * Data Fetching
   */
  useEffect(() => {
    const startFetching = async (): Promise<void> => {
      try {
        setData([]);
        const permissions = await new Permission().get(
          activeRole?.id as string
        );
        if (!ignore) {
          setData(permissions);
        }
      } catch (err: unknown) {
        if (!ignore) {
          showError(err);
        }
      }
    };
    let ignore = false;
    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    startFetching();
    return () => {
      ignore = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeRole]);

  return (
    <FormDialogCustom
      open={activeRole != null}
      title={`Edit ${activeRole?.name as string} Permissions`}
      closeDialogHandler={() => {
        setActiveRole(null);
      }}
      formSubmitHandler={updatePermissions}
      isProcessing={isProcessing}
    >
      <TablePermission data={data} onChangeHandler={checkBoxOnChangeHandler} />
    </FormDialogCustom>
  );
};

export default RolesPermissions;
