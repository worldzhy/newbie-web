import {type FC, useState, useEffect, useReducer} from 'react';
import {Stack} from '@mui/material';
import {User, Role} from '@prisma/client';
import UserService from '@/http/api/user';
import {raise, sendRequest, showError} from '@/http/mixins';
import FormDialogCustom from '@/components/FormDialogCustom';
import MultiSelectCustom from '@/components/MultiSelectCustom';
import FormDialogInputCustom from '@/components/FormDialogInputCustom';

interface Props {
  activeMember: (User & {roles: Role[]}) | undefined;
  data: (User & {roles: Role[]})[];
  setData: React.Dispatch<React.SetStateAction<(User & {roles: Role[]})[]>>;
  modal: boolean;
  setModal: React.Dispatch<React.SetStateAction<boolean>>;
  rolesList: Role[];
}

interface INewMember {
  email: string;
  phone: string;
  name: string;
  password: string;
}

const MembersEditModal: FC<Props> = ({
  activeMember,
  data,
  setData,
  modal,
  setModal,
  rolesList,
}) => {
  const [isProcessing, setIsProcessing] = useState(false);
  const [selectedRoleNames, setSelectedRoleNames] = useState<string[]>([]);
  const [updatedActiveMember, setUpdatedActiveMember] = useReducer(
    (prev: INewMember, next: Record<string, string>): INewMember => {
      return {...prev, ...next};
    },
    {
      email: '',
      phone: '',
      name: '',
      password: '',
    }
  );

  useEffect(() => {
    const startFetching = async (): Promise<void> => {
      try {
        if (!ignore) {
          setSelectedRoleNames(activeMember?.roles.map(r => r.name) ?? []);
          setUpdatedActiveMember({
            email: activeMember?.email ?? '',
            phone: activeMember?.phone ?? '',
            name: activeMember?.name ?? '',
            password: '',
          });
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
  }, [activeMember]);

  const editRole = async (): Promise<void> => {
    await sendRequest(setIsProcessing, async () => {
      const {email, phone, name, password} = updatedActiveMember;
      const roles = rolesList.filter(({name}) =>
        selectedRoleNames.includes(name)
      );
      const payload = {
        email,
        phone,
        name,
        password,
        roles,
      };
      await UserService.update(raise(activeMember?.id), payload);
      setData(
        data.map(d => {
          if (d.id === activeMember?.id) {
            return {
              ...d,
              ...payload,
            };
          }
          return d;
        })
      );
      setModal(false);
    });
  };

  return (
    <FormDialogCustom
      open={modal}
      title={`Edit ${activeMember?.name ?? ''}`}
      closeDialogHandler={() => {
        setModal(false);
      }}
      formSubmitHandler={editRole}
      isProcessing={isProcessing}
    >
      <Stack spacing={{xs: 2, sm: 1}}>
        <FormDialogInputCustom
          label="Email"
          type="email"
          value={updatedActiveMember.email}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            setUpdatedActiveMember({email: e.target.value});
          }}
        ></FormDialogInputCustom>
        <FormDialogInputCustom
          label="Phone"
          value={updatedActiveMember.phone}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            setUpdatedActiveMember({phone: e.target.value});
          }}
        ></FormDialogInputCustom>
        <FormDialogInputCustom
          label="Name"
          value={updatedActiveMember.name}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            setUpdatedActiveMember({name: e.target.value});
          }}
        ></FormDialogInputCustom>
        <FormDialogInputCustom
          placeholder="********"
          label="Password"
          value={updatedActiveMember.password}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            setUpdatedActiveMember({password: e.target.value});
          }}
        ></FormDialogInputCustom>
        <MultiSelectCustom
          label="Roles"
          options={rolesList.map(r => r.name)}
          selected={selectedRoleNames}
          setSelected={setSelectedRoleNames}
        />
      </Stack>
    </FormDialogCustom>
  );
};

export default MembersEditModal;
