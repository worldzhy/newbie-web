import React, { useEffect, type ReactElement, useState, type FC } from 'react';
import { useRouter } from 'next/router';
import User from '@/shared/libs/user';
import {
  delayExecute,
  isUnauthorized,
  sendRequest,
  showError,
} from '@/shared/libs/mixins';
import { Stack } from '@mui/material';
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

interface Props {
  data: IData[];
  setData: React.Dispatch<React.SetStateAction<IData[]>>;
  modal: boolean;
  setModal: React.Dispatch<React.SetStateAction<boolean>>;
}

const MembersAddModal: FC<Props> = ({
  data,
  setData,
  modal,
  setModal,
}): ReactElement => {
  /**
   * Declarations
   */
  const router = useRouter();

  /**
   * States
   */
  const [isProcessing, setIsProcessing] = useState(false);
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
        setRolesList([]);
        if (!ignore) {
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
      setData([
        ...data,
        {
          name: username,
          email,
          phone,
          role: roles.join(', '),
        },
      ]);
      setModal(false); // To do: If there is validation issue, do not close modal. Applicable to all modal.
    });
  };

  return (
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
  );
};

export default MembersAddModal;
