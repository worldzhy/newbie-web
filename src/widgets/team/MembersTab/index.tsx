import React, { useEffect, type ReactElement, useState } from 'react';
import { useRouter } from 'next/router';
import TableCustom from '@/components/TableCustom';
import User from '@/shared/libs/user';
import {
  delayExecute,
  isUnauthorized,
  sendRequest,
  showError,
} from '@/shared/libs/mixins';
import { Stack } from '@mui/material';
import ButtonCustom from '@/components/ButtonCustom';
import FormDialogCustom from '@/components/FormDialogCustom';
import FormDialogInputCustom from '@/components/FormDialogInputCustom';
import MultiSelectCustom from '@/components/MultiSelectCustom';
import Role, { type IRole } from '@/shared/libs/role';

/**
 * Types
 */

interface IData {
  name: string;
  email: string;
  phone: string;
  role: string;
}

const MembersTab = (): ReactElement => {
  /**
   * Declarations
   */
  const router = useRouter();
  const headers = ['Name', 'Email', 'Phone', 'Role'];

  /**
   * States
   */
  const [data, setData] = useState<IData[]>([]);
  const [modal, setModal] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [fetch, setFetch] = useState(false);
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [roles, setRoles] = useState<string[]>([]);
  const [rolesList, setRolesList] = useState<IRole[]>([]);

  /**
   * Data Fetching
   */
  useEffect(() => {
    const startFetching = async (): Promise<void> => {
      try {
        setData([]);
        if (!ignore) {
          const users = await new User().get();
          const fetchedData = users.records.map(
            ({ username, email, phone, roles }) => {
              return {
                name: username,
                email: email ?? 'null',
                phone: phone ?? 'null',
                role: roles[0]?.name ?? 'null',
              };
            }
          );
          setData(fetchedData);

          const roles = await new Role().get();
          setRolesList(roles);
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
  }, []);

  /**
   * Handlers
   */
  const createRole = async (): Promise<void> => {
    await sendRequest(setIsProcessing, async () => {
      const payload = {
        email,
        phone,
        username,
        password,
        roleIds: rolesList
          .filter((r) => roles.includes(r.name))
          .map((r) => {
            return {
              id: r.id,
            };
          }),
      };
      await new User().create(payload);
    });
    setFetch(!fetch);
    setModal(false); // To do: If there is validation issue, do not close modal. Applicable to all modal.
  };

  return (
    <>
      <Stack direction="column" spacing={2} alignItems="flex-end">
        <ButtonCustom
          customColor="dark"
          onClick={() => {
            setModal(true);
          }}
        >
          New member
        </ButtonCustom>
        <TableCustom
          headers={headers}
          rows={data}
          isLastColActions={false}
        ></TableCustom>
      </Stack>
      <FormDialogCustom
        open={modal}
        title="New member"
        closeDialogHandler={() => {
          setModal(false);
        }}
        formSubmitHandler={createRole}
        isProcessing={isProcessing}
      >
        <Stack spacing={1}>
          <FormDialogInputCustom
            label="Email"
            type="email"
            value={email}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              setEmail(e.target.value);
            }}
          ></FormDialogInputCustom>
          <FormDialogInputCustom
            label="Phone"
            value={phone}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              setPhone(e.target.value);
            }}
          ></FormDialogInputCustom>
          <FormDialogInputCustom
            label="Username"
            value={username}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              setUsername(e.target.value);
            }}
          ></FormDialogInputCustom>
          <FormDialogInputCustom
            label="Password"
            value={password}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              setPassword(e.target.value);
            }}
          ></FormDialogInputCustom>
          <MultiSelectCustom
            label="Roles"
            options={rolesList.map((r) => r.name)}
            selected={roles}
            setSelected={setRoles}
          />
        </Stack>
      </FormDialogCustom>
    </>
  );
};

export default MembersTab;
