import React, {type ReactElement, useState, type FC} from 'react';
import {raise, sendRequest} from '@/http/mixins';
import FormDialogCustom from '@/components/FormDialogCustom';
import RoleApiRequest from '@/http/api/role';
import {Role} from '@prisma/client';

/**
 * Types
 */

interface Props {
  activeRole: Role | undefined;
  data: Role[];
  setData: React.Dispatch<React.SetStateAction<Role[]>>;
  modal: boolean;
  setModal: React.Dispatch<React.SetStateAction<boolean>>;
}

const RolesDeleteModal: FC<Props> = ({
  activeRole,
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
  const deleteRole = async (): Promise<void> => {
    await sendRequest(setIsProcessing, async () => {
      await new RoleApiRequest().delete(raise(activeRole?.id));
      setData(data.filter(d => d.id !== activeRole?.id));
      setModal(false);
    });
  };

  return (
    <FormDialogCustom
      open={modal}
      title={`You are about to delete ${activeRole?.name ?? ''}`}
      contentText="You cannot view this role in your list anymore if you delete. This will permanently delete the role. Are you sure?"
      closeDialogHandler={() => {
        setModal(false);
      }}
      formSubmitHandler={deleteRole}
      isProcessing={isProcessing}
      stretch={false}
    ></FormDialogCustom>
  );
};

export default RolesDeleteModal;
