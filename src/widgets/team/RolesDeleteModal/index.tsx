import React, { type ReactElement, useState, type FC } from "react";
import { raise, sendRequest } from "@/shared/libs/mixins";
import { Stack } from "@mui/material";
import FormDialogCustom from "@/components/FormDialogCustom";
import Role, { type IRole } from "@/shared/libs/role";

/**
 * Types
 */

interface Props {
  activeRole: IRole | undefined;
  data: IRole[];
  setData: React.Dispatch<React.SetStateAction<IRole[]>>;
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
      await new Role().delete(raise(activeRole?.id));
      setData(data.filter((d) => d.id !== activeRole?.id));
      setModal(false);
    });
  };

  return (
    <FormDialogCustom
      open={modal}
      title={`You are about to delete ${activeRole?.name ?? ""}`}
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
