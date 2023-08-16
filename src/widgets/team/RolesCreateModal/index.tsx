import {useState, type FC} from 'react';
import {sendRequest} from '@/http/mixins';
import RoleService from '@/http/api/role';
import FormDialogCustom from '@/components/FormDialogCustom';
import FormDialogInputCustom from '@/components/FormDialogInputCustom';
import {Role} from '@prisma/client';

interface Props {
  data: Role[];
  setData: React.Dispatch<React.SetStateAction<Role[]>>;
  modal: boolean;
  setModal: React.Dispatch<React.SetStateAction<boolean>>;
}

const RolesCreateModal: FC<Props> = ({
  data,
  setData,
  modal,
  setModal,
}) => {
  const [isProcessing, setIsProcessing] = useState(false);
  const [roleName, setRoleName] = useState('');

  const createRole = async (): Promise<void> => {
    await sendRequest(setIsProcessing, async () => {
      const res = await RoleService.create({name: roleName});
      setData([...data, res]);
      setModal(false);
    });
  };

  return (
    <FormDialogCustom
      open={modal}
      title="New role"
      closeDialogHandler={() => {
        setModal(false);
      }}
      formSubmitHandler={createRole}
      isProcessing={isProcessing}
    >
      <FormDialogInputCustom
        label="Name"
        value={roleName}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
          setRoleName(e.target.value);
        }}
      ></FormDialogInputCustom>
    </FormDialogCustom>
  );
};

export default RolesCreateModal;
