import {useState, type FC} from 'react';
import {Role, User} from '@prisma/client';
import UserService from '@/http/api/user';
import {raise, sendRequest} from '@/http/mixins';
import FormDialogCustom from '@/components/FormDialogCustom';

interface Props {
  activeMember: (User & {roles: Role[]}) | undefined;
  data: (User & {roles: Role[]})[];
  setData: React.Dispatch<React.SetStateAction<(User & {roles: Role[]})[]>>;
  modal: boolean;
  setModal: React.Dispatch<React.SetStateAction<boolean>>;
}

const MembersDeleteModal: FC<Props> = ({
  data,
  modal,
  activeMember,
  setData,
  setModal,
}) => {
  const [isProcessing, setIsProcessing] = useState(false);

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
