import React, { type ReactElement, useEffect, useState } from 'react';
import { Stack } from '@mui/material';
import ButtonCustom from '@/components/ButtonCustom/ButtonCustom';
import InputTextCustom from '@/components/InputTextCustom/InputTextCustom';
import { sendRequest, showError } from '@/shared/libs/mixins';
import Role from '@/shared/libs/role';
import Permission from '@/shared/libs/permission';
import TablePermission from './Permissions';
import RolesTable from './Roles';
import FormDialogCustom from '@/components/FormDialogCustom';

const TeamRoles = (): ReactElement => {
  /**
   * Types
   */
  interface Request {
    change: 'add' | 'delete';
    resourceId?: number;
    resource: string;
    action: string;
    roleId: string;
  }

  /**
   * States
   */
  const [isProcessing, setIsProcessing] = useState(false);
  const [newRoleModal, setNewRoleModal] = useState(false);
  const [roleName, setRoleName] = useState('');
  const [newFetch, setNewFetch] = useState(false);
  const [activeRole, setActiveRole] = useState<null | string>(null);
  const [requests, setRequests] = useState<Map<string, Request>>(new Map());

  /**
   * States
   */
  const [rows, setRows] = useState<
    Array<{
      id: string;
      name: string;
      description: string;
    }>
  >([]);

  /**
   * Data Fetching
   */
  useEffect(() => {
    const startFetching = async (): Promise<void> => {
      try {
        setRows([]);
        const roles = await new Role().get();
        if (!ignore) {
          const fetchedRows = roles.map(({ id, name, description }) => {
            return { id, name, description: description ?? 'xxx' };
          });
          setRows(fetchedRows);
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
  }, [newFetch]);

  /**
   * Handlers
   */
  const createRole = async (): Promise<void> => {
    await sendRequest(setIsProcessing, async () => {
      await new Role().create(roleName);
    });
    setNewFetch(!newFetch);
    setNewRoleModal(false);
  };

  const updatePermissions = async (): Promise<void> => {
    await sendRequest(setIsProcessing, async () => {
      await new Permission().update(requests);
    });
  };

  return (
    <>
      <Stack direction="column" spacing={2} alignItems="flex-end">
        <ButtonCustom
          customColor="dark"
          onClick={() => {
            setNewRoleModal(true);
          }}
        >
          New role
        </ButtonCustom>
        <RolesTable rows={rows} setDiaglogState={setActiveRole} />
      </Stack>
      <FormDialogCustom
        open={newRoleModal}
        title="Role Name"
        contentText="Enter the desired role name in the designated field to create a
            role."
        closeDialogHandler={() => {
          setNewRoleModal(false);
        }}
        formSubmitHandler={createRole}
        isProcessing={isProcessing}
      >
        <InputTextCustom
          label="Role name"
          variant="outlined"
          value={roleName}
          type="text"
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            setRoleName(e.target.value);
          }}
        />
      </FormDialogCustom>
      <FormDialogCustom
        open={activeRole != null}
        title="Edit Role Permissions"
        closeDialogHandler={() => {
          setActiveRole(null);
        }}
        formSubmitHandler={updatePermissions}
        isProcessing={isProcessing}
      >
        <TablePermission
          roleId={activeRole as string}
          requests={requests}
          setRequests={setRequests}
        />
      </FormDialogCustom>
    </>
  );
};

export default TeamRoles;
