import React, { type ReactElement, useEffect, useState } from 'react';
import { Stack } from '@mui/material';
import ButtonCustom from '@/components/ButtonCustom/ButtonCustom';
import InputTextCustom from '@/components/InputTextCustom/InputTextCustom';
import { sendRequest, showError } from '@/shared/libs/mixins';
import Role from '@/shared/libs/role';
import RolesPermissions from './permissions';
import RolesTable from './roles';
import FormDialogCustom from '@/components/FormDialogCustom';

const TeamRoles = (): ReactElement => {
  /**
   * States
   */
  const [isProcessing, setIsProcessing] = useState(false);
  const [newRoleModal, setNewRoleModal] = useState(false);
  const [roleName, setRoleName] = useState('');
  const [newFetch, setNewFetch] = useState(false);
  const [activeRole, setActiveRole] = useState<null | {
    id: string;
    name: string;
  }>(null);

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
      <RolesPermissions activeRole={activeRole} setActiveRole={setActiveRole} />
    </>
  );
};

export default TeamRoles;
