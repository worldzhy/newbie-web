import React, {type ReactElement, type FC, useEffect, useState} from 'react';
import {
  Checkbox,
  FormControlLabel,
  FormGroup,
  TableCell,
  TableRow,
} from '@mui/material';
import {
  raise,
  showError,
  sendRequest,
  delayExecute,
  isUnauthorized,
} from '@/http/mixins';
import Permission, {
  type IPermissionsByResources,
  type IRequest,
} from '@/http/api/permission';
import {useRouter} from 'next/router';
import FormDialogCustom from '@/components/FormDialogCustom';
import TableSkeletonCustom from '@/components/TableSkeletonCustom';
import TableContainerCustom from '@/components/TableContainerCustom';
import {Role} from '@prisma/client';

/**
 * Types
 */

interface Props {
  activeRole: Role | undefined;
  modal: boolean;
  setModal: React.Dispatch<React.SetStateAction<boolean>>;
}

const RolesSetPermisssionsModal: FC<Props> = ({
  activeRole,
  modal,
  setModal,
}): ReactElement => {
  /**
   * Declarations
   */
  const router = useRouter();
  const headers = ['Resouce', 'Permission'];

  /**
   * States
   */
  const [isFetching, setIsFetching] = useState(true);
  const [isProcessing, setIsProcessing] = useState(false);
  const [data, setData] = useState<IPermissionsByResources[]>([]);
  const [requests, setRequests] = useState<Map<string, IRequest>>(new Map());

  /**
   * Handlers
   */
  const updatePermissions = async (): Promise<void> => {
    await sendRequest(setIsProcessing, async () => {
      const res = await new Permission().update(requests);
      res.forEach(r => {
        setData(
          data.map(d => {
            if (d.resource === r.resource) {
              d.permissions.map(p => {
                if (p.action === r.action) {
                  p.id = r.change === 'Delete' ? null : r.id;
                }
                return d;
              });
            }
            return d;
          })
        );
      });
      setRequests(new Map());
    });
  };

  const checkBoxOnChangeHandler = (
    resource: string,
    action: string,
    id: number | null
  ): void => {
    setData(
      data.map(d => {
        if (d.resource === resource) {
          d.permissions.map(p => {
            if (p.action === action) {
              p.allow = !p.allow;
            }
            return d;
          });
        }
        return d;
      })
    );
    const isAdd = data
      .find(d => d.resource === resource)
      ?.permissions.find(p => p.action === action)?.allow;
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
        roleId: raise(activeRole?.id),
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
        if (!ignore) {
          setIsFetching(true);
          if (!activeRole?.id) return;
          const permissions = await new Permission().get(activeRole?.id);
          setData(permissions);
          setIsFetching(false);
        }
      } catch (err: unknown) {
        if (!ignore) {
          if (isUnauthorized(err)) {
            delayExecute(() => {
              void router.push('/');
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
  }, [activeRole]);

  return (
    <FormDialogCustom
      open={modal}
      title={`Edit Permissions for ${activeRole?.name ?? ''}`}
      closeDialogHandler={() => {
        setModal(false);
      }}
      formSubmitHandler={updatePermissions}
      isProcessing={isProcessing}
    >
      <TableContainerCustom headers={headers}>
        {isFetching ? (
          <TableSkeletonCustom numCols={headers.length} />
        ) : (
          data
            .sort((a, b) => a.resource.localeCompare(b.resource))
            .map(({resource, permissions}, key) => (
              <TableRow key={key}>
                <TableCell align="center">{resource}</TableCell>
                <TableCell align="center">
                  <FormGroup row={true}>
                    {permissions.map((p, key: number) => (
                      <FormControlLabel
                        key={key}
                        control={
                          <Checkbox
                            checked={p.allow}
                            onChange={() => {
                              checkBoxOnChangeHandler(resource, p.action, p.id);
                            }}
                          />
                        }
                        label={p.action}
                      />
                    ))}
                  </FormGroup>
                </TableCell>
              </TableRow>
            ))
        )}
      </TableContainerCustom>
    </FormDialogCustom>
  );
};

export default RolesSetPermisssionsModal;
