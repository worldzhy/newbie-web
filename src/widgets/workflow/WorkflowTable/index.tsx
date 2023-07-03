import { FC, useState } from "react";
import { useRouter } from "next/router";
import { Box, Modal } from "@mui/material";
import { ModalStyle } from "@/constants/styleConfig";
import EditModal from "../EditModal";
import CloseIcon from "@mui/icons-material/Close";
import TableCustom from "@/components/TableCustom";
import ButtonCustom from "@/components/ButtonCustom";

import styles from "./index.module.scss";

const headers = ["Workflow", "Description", "Actions"];

// TODO: remove mock data
const rows = [
  { id: 1, name: "Workflow 1", desc: "Description 1", Actions: [] },
  { id: 2, name: "Workflow 2", desc: "Description 2", Actions: [] },
];

const Table: FC = () => {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const [values, setValues] = useState<any>();

  const actionsRender = (index: number) => (
    <>
      <ButtonCustom
        customColor="link"
        size="small"
        onClick={() => {
          setValues(rows[index]);
          setOpen(true);
        }}
      >
        Edit
      </ButtonCustom>
      <ButtonCustom
        customColor="link"
        size="small"
        onClick={() =>
          router.push({
            pathname: "/workflow/manage",
            query: { id: "1" },
          })
        }
      >
        Configure
      </ButtonCustom>
      <ButtonCustom
        customColor="link"
        size="small"
        onClick={() =>
          router.push({
            pathname: "/workflow/run",
            query: { id: "1" },
          })
        }
      >
        Run
      </ButtonCustom>
      <ButtonCustom
        customColor="link"
        size="small"
        onClick={() => {
          setValues(rows[index]);
          setOpenDelete(true);
        }}
      >
        Delete
      </ButtonCustom>
    </>
  );
  const handleDelete = () => {
    // TODO: handle delete
  };

  return (
    <>
      <TableCustom
        rows={rows.map(({ id, ...rest }) => rest)}
        headers={headers}
        isLastColActions={true}
        children={actionsRender}
      />
      <EditModal open={open} setOpen={setOpen} values={values} />
      <Modal open={openDelete} onClose={() => setOpenDelete(false)}>
        <Box sx={ModalStyle}>
          <div className={styles.container}>
            <CloseIcon
              className={styles.close}
              onClick={() => {
                setOpenDelete(false);
              }}
            />
            <h3 style={{ marginBottom: 30 }}>
              Are you sure you want to delete {values?.name}
            </h3>
            <ButtonCustom
              size="small"
              customColor="light"
              className={styles.submit}
              onClick={handleDelete}
            >
              Delete
            </ButtonCustom>
          </div>
        </Box>
      </Modal>
    </>
  );
};

export default Table;
