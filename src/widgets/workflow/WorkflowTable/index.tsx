import { FC, useState } from "react";
import { useRouter } from "next/router";
import { Box, Modal } from "@mui/material";
import { ModalStyle } from "@/constants/styleConfig";
import Workflow, { WorkflowItem } from "@/shared/libs/workflow";
import EditModal from "../EditModal";
import CloseIcon from "@mui/icons-material/Close";
import TableCustom from "@/components/TableCustom";
import ButtonCustom from "@/components/ButtonCustom";

import styles from "./index.module.scss";

type IProps = {
  rows: WorkflowItem[];
  refreshData?: () => void;
};

const headers = ["Workflow", "Description", "Actions"];

const Table: FC<IProps> = ({ rows, refreshData }) => {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const [values, setValues] = useState<any>();
  const workflowService = new Workflow();

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
            query: { id: rows[index]?.id },
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
            query: { id: rows[index]?.id },
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
  const handleDelete = async () => {
    await workflowService.deleteWorkflow(values.id);
    refreshData && refreshData();
    setOpenDelete(false);
  };

  return (
    <>
      <TableCustom
        rows={rows.map(({ id, ...rest }) => rest)}
        headers={headers}
        isLastColActions={true}
        children={actionsRender}
      />
      <EditModal
        type="workflow"
        open={open}
        values={values}
        setOpen={setOpen}
        refreshData={refreshData}
      />
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
