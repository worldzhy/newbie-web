import React, {type ReactElement, useState, type FC, useReducer} from 'react';
import {User, Role} from '@prisma/client';
import {sendRequest} from '@/http/mixins';
import {Stack} from '@mui/material';
import FormDialogCustom from '@/components/FormDialogCustom';
import FormDialogInputCustom from '@/components/FormDialogInputCustom';
import MultiSelectCustom from '@/components/MultiSelectCustom';
import UserService from '@/http/api/user';

/**
 * Types
 */

interface Props {
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

const MembersCreateModal: FC<Props> = ({
  data,
  setData,
  modal,
  setModal,
  rolesList,
}): ReactElement => {
  /**
   * States
   */
  const [isProcessing, setIsProcessing] = useState(false);
  const [selectedRoleNames, setSelectedRoleNames] = useState<string[]>([]);
  const [newMember, updateNewMember] = useReducer(
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

  /**
   * Handlers
   */
  const createUser = async (): Promise<void> => {
    await sendRequest(setIsProcessing, async () => {
      const roles = rolesList.filter(({name}) =>
        selectedRoleNames.includes(name)
      );
      const newMemberData = {...newMember, roles};
      const res = await UserService.create(newMemberData);
      setData([...data, {...res, roles}]);
      setModal(false);
    });
  };

  return (
    <FormDialogCustom
      open={modal}
      title="New member"
      closeDialogHandler={() => {
        setModal(false);
      }}
      formSubmitHandler={createUser}
      isProcessing={isProcessing}
    >
      <Stack spacing={{xs: 2, sm: 1}}>
        <FormDialogInputCustom
          label="Email"
          type="email"
          value={newMember.email}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            updateNewMember({email: e.target.value});
          }}
        ></FormDialogInputCustom>
        <FormDialogInputCustom
          label="Phone"
          value={newMember.phone}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            updateNewMember({phone: e.target.value});
          }}
        ></FormDialogInputCustom>
        <FormDialogInputCustom
          label="Name"
          value={newMember.name}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            updateNewMember({name: e.target.value});
          }}
        ></FormDialogInputCustom>
        <FormDialogInputCustom
          label="Password"
          value={newMember.password}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            updateNewMember({password: e.target.value});
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

export default MembersCreateModal;
