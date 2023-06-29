import React, { type ReactElement, useEffect, useState } from 'react';
import { Stack } from '@mui/material';
import ButtonCustom from '@/components/ButtonCustom';
import InputTextCustom from '@/components/InputTextCustom';
import { sendRequest, showError } from '@/shared/libs/mixins';
import Role from '@/shared/libs/role';
import RolesPermissions from './permissionsList';
import RolesTable from './rolesList';
import FormDialogCustom from '@/components/FormDialogCustom';

const TeamRoles = (): ReactElement => {
  /**
   * States
   */
  const [isProcessing, setIsProcessing] = useState(false);
  const [roleModal, setRoleModal] = useState(false);
  const [roleName, setRoleName] = useState('');
  const [fetch, setFetch] = useState(false);
  const [permissionModal, setPermissionModal] = useState(false);
  const [activeRole, setActiveRole] = useState<{
    id?: string;
    name?: string;
  }>({});

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
        if (!ignore) {
          const roles = await new Role().get();
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
  }, [fetch]);

  /**
   * Handlers
   */
  const createRole = async (): Promise<void> => {
    await sendRequest(setIsProcessing, async () => {
      await new Role().create(roleName);
    });
    setFetch(!fetch);
    setRoleModal(false);
  };

  return (
    <>
      <Stack direction="column" spacing={2} alignItems="flex-end">
        <ButtonCustom
          customColor="dark"
          onClick={() => {
            setRoleModal(true);
          }}
        >
          New role
        </ButtonCustom>
        <RolesTable
          rows={rows}
          setActiveRole={setActiveRole}
          setPermissionModal={setPermissionModal}
        />
      </Stack>
      <FormDialogCustom
        open={roleModal}
        title="Role Name"
        contentText="Enter the desired role name in the designated field to create a
            role."
        closeDialogHandler={() => {
          setRoleModal(false);
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
      <RolesPermissions
        activeRole={activeRole}
        setPermissionModal={setPermissionModal}
        permissionModal={permissionModal}
      />
    </>
  );
};

export default TeamRoles;
