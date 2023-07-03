import { FC, useState, useEffect } from "react";
import { ModalStyle } from "@/constants/styleConfig";
import { Box, FormControl, Input, InputLabel, Modal } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import ButtonCustom from "@/components/ButtonCustom";

import styles from "./index.module.scss";

interface IProps {
  type: string;
  open: boolean;
  values?: Record<string, string>;
  setOpen: (open: boolean) => void;
}

const EditModal: FC<IProps> = ({
  type,
  open,
  setOpen,
  values = { id: undefined, name: "", desc: "" },
}) => {
  const { id, name: initName, desc: initDesc } = values;
  const [name, setName] = useState("");
  const [desc, setDesc] = useState("");

  const handleUpdate = (): void => {
    console.log(type, name, desc, "----> type name desc");
    if (id) {
      // TODO: do update
    } else {
      // TODO: do add
    }
    setName("");
    setDesc("");
    setOpen(false);
  };

  useEffect(() => {
    setName(initName);
    setDesc(initDesc);
  }, [initName, initDesc]);

  return (
    <Modal open={open} onClose={() => setOpen(false)}>
      <Box sx={ModalStyle}>
        <div className={styles.container}>
          <CloseIcon className={styles.close} onClick={() => setOpen(false)} />
          <h3 style={{ marginBottom: 30 }}>
            {!id ? "New" : "Edit"} {type}
          </h3>
          <FormControl style={{ marginBottom: 30 }}>
            <InputLabel htmlFor="name">Name</InputLabel>
            <Input
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </FormControl>
          <FormControl style={{ marginBottom: 20 }}>
            <InputLabel htmlFor="desc">Description</InputLabel>
            <Input
              id="desc"
              value={desc}
              onChange={(e) => setDesc(e.target.value)}
            />
          </FormControl>
          <ButtonCustom
            size="small"
            customColor="light"
            className={styles.submit}
            onClick={handleUpdate}
          >
            {!id ? "Create" : "Update"}
          </ButtonCustom>
        </div>
      </Box>
    </Modal>
  );
};

export default EditModal;
