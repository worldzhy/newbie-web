import React, {
  useEffect,
  type ReactElement,
  useState,
  type FC,
  useReducer,
} from 'react';
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
import { type IMember } from '@/widgets/team/MembersTab';

/**
 * Types
 */

interface Props {
  data: IMember[];
  setData: React.Dispatch<React.SetStateAction<IMember[]>>;
  modal: boolean;
  setModal: React.Dispatch<React.SetStateAction<boolean>>;
}

interface INewMember {
  email: string;
  phone: string;
  username: string;
  password: string;
  roles: string[];
}

const MembersCreateModal: FC<Props> = ({
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
  const [rolesList, setRolesList] = useState<IRole[]>([]);
  const [roles, setRoles] = useState<string[]>([]);
  const [newMember, updateNewMember] = useReducer(
    (prev: INewMember, next: Record<string, string | string[]>): INewMember => {
      return { ...prev, ...next };
    },
    {
      email: '',
      phone: '',
      username: '',
      password: '',
      roles: [],
    }
  );

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
  }, [router]);

  /**
   * Handlers
   */
  const createRole = async (): Promise<void> => {
    await sendRequest(setIsProcessing, async () => {
      const { username, email, phone, password } = newMember;
      const roleIds = rolesList
        .filter(({ name }) => roles.includes(name))
        .map(({ id }) => ({ id }));
      const roleNames = roles.join(', ');
      const res = await new User().create({
        username,
        email,
        phone,
        password,
        roleIds,
      });
      setData([...data, { id: res.id, username, email, phone, roleNames }]);
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
          value={newMember.email}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            updateNewMember({ email: e.target.value });
          }}
        ></FormDialogInputCustom>
        <FormDialogInputCustom
          label="Phone"
          value={newMember.phone}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            updateNewMember({ phone: e.target.value });
          }}
        ></FormDialogInputCustom>
        <FormDialogInputCustom
          label="Username"
          value={newMember.username}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            updateNewMember({ username: e.target.value });
          }}
        ></FormDialogInputCustom>
        <FormDialogInputCustom
          label="Password"
          value={newMember.password}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            updateNewMember({ password: e.target.value });
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

export default MembersCreateModal;
