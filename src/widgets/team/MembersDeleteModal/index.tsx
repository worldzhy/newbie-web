import React, { type ReactElement, useState, type FC } from "react";
import User, { type IUser } from "@/shared/libs/user";
import { raise, sendRequest } from "@/shared/libs/mixins";
import FormDialogCustom from "@/components/FormDialogCustom";

/**
 * Types
 */

interface Props {
  activeMember: IUser | undefined;
  data: IUser[];
  setData: React.Dispatch<React.SetStateAction<IUser[]>>;
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
  const deleteRole = async (): Promise<void> => {
    await sendRequest(setIsProcessing, async () => {
      await new User().delete(raise(activeMember?.id));
      setData(data.filter((d) => d.id !== activeMember?.id));
      setModal(false); // To do: If there is validation issue, do not close modal. Applicable to all modal.
    });
  };

  return (
    <FormDialogCustom
      open={modal}
      title={`You are about to delete ${activeMember?.username ?? ""}`}
      contentText="You cannot view this user in your list anymore if you delete. This will permanently delete the user. Are you sure?"
      closeDialogHandler={() => {
        setModal(false);
      }}
      formSubmitHandler={deleteRole}
      isProcessing={isProcessing}
      stretch={false}
    ></FormDialogCustom>
  );
};

export default MembersDeleteModal;
