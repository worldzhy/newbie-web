import React, { type ReactElement, useState, type FC } from "react";
import { sendRequest } from "@/shared/libs/mixins";
import Role, { type IRole } from "@/shared/libs/role";
import FormDialogCustom from "@/components/FormDialogCustom";
import FormDialogInputCustom from "@/components/FormDialogInputCustom";

/**
 * Types
 */

interface Props {
  data: IRole[];
  setData: React.Dispatch<React.SetStateAction<IRole[]>>;
  modal: boolean;
  setModal: React.Dispatch<React.SetStateAction<boolean>>;
}

const RolesCreateModal: FC<Props> = ({
  data,
  setData,
  modal,
  setModal,
}): ReactElement => {
  /**
   * States
   */
  const [isProcessing, setIsProcessing] = useState(false);
  const [roleName, setRoleName] = useState("");

  /**
   * Handlers
   */
  const createRole = async (): Promise<void> => {
    await sendRequest(setIsProcessing, async () => {
      const res = await new Role().create(roleName);
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
