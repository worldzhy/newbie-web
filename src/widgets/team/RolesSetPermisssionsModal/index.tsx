import React, { type ReactElement, type FC, useEffect, useState } from "react";
import { useRouter } from "next/router";
import Permission from "@/shared/libs/permission";
import {
  delayExecute,
  isUnauthorized,
  sendRequest,
  showError,
} from "@/shared/libs/mixins";
import FormDialogCustom from "@/components/FormDialogCustom";
import TablePermission from "../RolesPermisssionsTable";

/**
 *
 * Table responsible for showing the per role (as identified by roleId) permissions against resources.
 * This component is used in Team > Roles > Edit page.
 *
 **/

/**
 * Types
 */

interface Props {
  activeRole: IActiveRole;
  permissionModal: boolean;
  setPermissionModal: React.Dispatch<React.SetStateAction<boolean>>;
}

interface IActiveRole {
  id?: string;
  name?: string;
}

interface IRequest {
  change: "add" | "delete";
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

const RolesSetPermisssionsModal: FC<Props> = ({
  activeRole,
  permissionModal,
  setPermissionModal,
}): ReactElement => {
  /**
   * Declarations
   */
  const router = useRouter();

  /**
   * States
   */
  const [data, setData] = useState<IPermissionByResource[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [requests, setRequests] = useState<Map<string, IRequest>>(new Map());
  const [fetch, setFetch] = useState(false);

  /**
   * Handlers
   */
  const updatePermissions = async (): Promise<void> => {
    await sendRequest(setIsProcessing, async () => {
      await new Permission().update(requests);
    });
    setRequests(new Map());
    setFetch(!fetch);
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
        change: isAdd ? "add" : "delete",
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
          if (isUnauthorized(err)) {
            delayExecute(() => {
              void router.push("/");
            }, 0);
          } else {
            showError(err);
          }
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
  }, [activeRole, fetch]);

  return (
    <FormDialogCustom
      open={permissionModal}
      title={`Edit Permissions for ${activeRole?.name as string}`}
      closeDialogHandler={() => {
        setPermissionModal(false);
      }}
      formSubmitHandler={updatePermissions}
      isProcessing={isProcessing}
    >
      <TablePermission data={data} onChangeHandler={checkBoxOnChangeHandler} />
    </FormDialogCustom>
  );
};

export default RolesSetPermisssionsModal;
