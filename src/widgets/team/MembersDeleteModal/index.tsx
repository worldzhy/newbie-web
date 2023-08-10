import React, {type ReactElement, useState, type FC} from 'react';
import {raise, sendRequest} from '@/http/mixins';
import FormDialogCustom from '@/components/FormDialogCustom';
import {Role, User} from '@prisma/client';
import UserService from '@/http/api/user';

/**
 * Types
 */

interface Props {
  activeMember: (User & {roles: Role[]}) | undefined;
  data: (User & {roles: Role[]})[];
  setData: React.Dispatch<React.SetStateAction<(User & {roles: Role[]})[]>>;
  modal: boolean;
  setModal: React.Dispatch<React.SetStateAction<boolean>>;
}

const MembersDeleteModal: FC<Props> = ({
  activeMember,
  data,
  setData,
  modal,
  setModal,
}): ReactElement => {
  /**
   * States
   */
  const [isProcessing, setIsProcessing] = useState(false);

  /**
   * Handlers
   */
  const deleteMember = async (): Promise<void> => {
    await sendRequest(setIsProcessing, async () => {
      await UserService.delete(raise(activeMember?.id));
      setData(data.filter(d => d.id !== activeMember?.id));
      setModal(false);
    });
  };

  return (
    <FormDialogCustom
      open={modal}
      title={`You are about to delete ${activeMember?.name ?? ''}`}
      contentText="You cannot view this user in your list anymore if you delete. This will permanently delete the user. Are you sure?"
      closeDialogHandler={() => {
        setModal(false);
      }}
      formSubmitHandler={deleteMember}
      isProcessing={isProcessing}
      stretch={false}
    ></FormDialogCustom>
  );
};

export default MembersDeleteModal;
