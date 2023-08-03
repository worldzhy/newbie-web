import {FC, useEffect, useState} from 'react';
import {
  Box,
  Modal,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  Link,
  Button,
} from '@mui/material';
import {Data} from '@/pages/workflow/manage';
import {ModalStyle} from '@/constants/styleConfig';
import RouteModal from '../RouteModal';
import CloseIcon from '@mui/icons-material/Close';
import TableCustom from '@/components/TableCustom';
import RouteService from '@/shared/libs/workflow-route';

import styles from './index.module.scss';

type IProps = {
  data: Data | undefined;
  refreshData: () => void;
};

const headers = ['View', 'State', 'Next View', 'Actions'];

const Table: FC<IProps> = ({data, refreshData}) => {
  const [open, setOpen] = useState(false);
  const [openStartSign, setOpenStartSign] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const [values, setValues] = useState<any>();
  const [startSignId, setStartSignId] = useState('');
  const {views = [], states = [], routes = []} = data || {};
  const service = new RouteService();

  const actionsRender = (index: number) => (
    <>
      <Link
        style={{marginRight: 6}}
        onClick={() => {
          setValues(routes[index]);
          setOpen(true);
        }}
      >
        Edit
      </Link>
      <Link
        onClick={() => {
          setValues(routes[index]);
          setOpenDelete(true);
        }}
      >
        Delete
      </Link>
    </>
  );
  const handleCreate = () => {
    setValues(undefined);
    setOpen(true);
  };
  const handleDelete = async () => {
    await service.deleteRoute(values.id);
    refreshData();
    setOpenDelete(false);
  };
  const handleUpdateStartSign = async () => {
    await service.updateRoute({id: startSignId, startSign: true});
    refreshData();
    setOpenStartSign(false);
    setStartSignId('');
  };

  useEffect(() => {
    setStartSignId(routes.find(({startSign}) => startSign)?.id || '');
  }, [routes]);

  return (
    <>
      <div className={styles.addContainer}>
        <Button
          size="small"
          variant="outlined"
          onClick={() => setOpenStartSign(true)}
          style={{marginRight: 20}}
        >
          Set Starting Point
        </Button>
        <Button size="small" variant="contained" onClick={handleCreate}>
          New Route
        </Button>
      </div>
      <TableCustom
        rows={routes.map(({startSign, view, state, nextView, Actions}) => ({
          view: startSign ? `(*) ${view}` : view,
          state,
          nextView,
          Actions,
        }))}
        headers={headers}
        isLastColActions={true}
        children={actionsRender}
      />
      <RouteModal
        views={views}
        states={states}
        open={open}
        setOpen={setOpen}
        values={values}
        refreshData={refreshData}
      />
      <Modal open={openDelete} onClose={() => setOpenDelete(false)}>
        <Box sx={ModalStyle}>
          <div className={styles.container}>
            <CloseIcon
              className={styles.close}
              onClick={() => setOpenDelete(false)}
            />
            <h3 style={{marginBottom: 30}}>
              Are you sure you want to delete {values?.view}
            </h3>
            <Button
              size="small"
              variant="outlined"
              className={styles.submit}
              onClick={handleDelete}
            >
              Delete
            </Button>
          </div>
        </Box>
      </Modal>
      <Modal open={openStartSign} onClose={() => setOpenStartSign(false)}>
        <Box sx={ModalStyle}>
          <div className={styles.container}>
            <CloseIcon
              className={styles.close}
              onClick={() => setOpenStartSign(false)}
            />
            <h3 style={{marginBottom: 30}}>Choice Start Point</h3>
            <FormControl style={{marginBottom: 20}}>
              <InputLabel htmlFor="startSign">Start Point</InputLabel>
              <Select
                id="startSign"
                labelId="startSign"
                value={startSignId}
                label="Start Point"
                onChange={e => setStartSignId(e.target.value)}
              >
                {routes.map(({id, startSign, view, state, nextView}, index) => (
                  <MenuItem value={id} key={id}>
                    {`${index + 1}. ${
                      startSign ? `(*) ${view}` : view
                    } --> ${state} --> ${nextView}`}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <Button
              size="small"
              variant="outlined"
              className={styles.submit}
              onClick={handleUpdateStartSign}
            >
              Update
            </Button>
          </div>
        </Box>
      </Modal>
    </>
  );
};

export default Table;
