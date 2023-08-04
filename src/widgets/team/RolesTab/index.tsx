import React, {type ReactElement, useEffect, useState} from 'react';
import {
  showError,
  sortDate,
  delayExecute,
  isUnauthorized,
} from '@/shared/libs/mixins';
import {useRouter} from 'next/router';
import Role, {type IRole} from '@/shared/libs/role';
import {Button, Link, Stack, TableCell, TableRow} from '@mui/material';
import RolesEditModal from '../RolesEditModal';
import RolesCreateModal from '../RolesCreateModal';
import RolesDeleteModal from '../RolesDeleteModal';
import SkeletonCustom from '@/components/SkeletonCustom';
import TableContainerCustom from '@/components/TableContainerCustom';
import RolesSetPermisssionsModal from '../RolesSetPermisssionsModal';

const RolesTab = (): ReactElement => {
  /**
   * Declarations
   */
  const router = useRouter();
  const headers = ['Name', 'Description', 'Permissions'];

  /**
   * States
   */
  const [isFetching, setIsFetching] = useState(true);
  const [createModal, setCreateModal] = useState(false);
  const [permissionModal, setPermissionModal] = useState(false);
  const [editModal, setEditModal] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const [activeRole, setActiveRole] = useState<IRole>();
  const [data, setData] = useState<IRole[]>([]);

  /**
   * Data Fetching
   */
  useEffect(() => {
    const startFetching = async (): Promise<void> => {
      try {
        setData([]);
        if (!ignore) {
          const roles = await new Role().getAll();
          setData(roles);
          setIsFetching(false);
        }
      } catch (err: unknown) {
        if (!ignore) {
          if (isUnauthorized(err)) {
            delayExecute(() => {
              void router.push('/');
            }, 0);
          } else {
            showError(err);
          }
        }
      }
    };
    let ignore = false;
    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    startFetching();
    return () => {
      ignore = true;
    };
  }, [router]);

  /**
   * Components
   */
  const table = (
    <TableContainerCustom headers={headers}>
      {data
        .sort((a, b) => sortDate(a.createdAt, b.createdAt))
        .map((d, key) => (
          <TableRow key={key}>
            <TableCell align="center">{d.name}</TableCell>
            <TableCell align="center">{d.description}</TableCell>
            <TableCell align="center">
              <Link
                style={{marginRight: 6}}
                onClick={() => {
                  setActiveRole(d);
                  setEditModal(true);
                }}
              >
                Edit
              </Link>
              <Link
                style={{marginRight: 6}}
                onClick={() => {
                  setActiveRole(d);
                  setPermissionModal(true);
                }}
              >
                Set Permissions
              </Link>
              <Link
                onClick={() => {
                  setActiveRole(d);
                  setDeleteModal(true);
                }}
              >
                Delete
              </Link>
            </TableCell>
          </TableRow>
        ))}
    </TableContainerCustom>
  );

  return (
    <>
      <Stack direction="column" spacing={2} alignItems="flex-end">
        <Button
          variant="contained"
          onClick={() => {
            setCreateModal(true);
          }}
        >
          New role
        </Button>
        {isFetching ? <SkeletonCustom /> : table}
      </Stack>
      <RolesCreateModal
        data={data}
        setData={setData}
        modal={createModal}
        setModal={setCreateModal}
      />
      <RolesEditModal
        activeRole={activeRole}
        data={data}
        setData={setData}
        modal={editModal}
        setModal={setEditModal}
      />
      <RolesSetPermisssionsModal
        activeRole={activeRole}
        modal={permissionModal}
        setModal={setPermissionModal}
      />
      <RolesDeleteModal
        activeRole={activeRole}
        data={data}
        setData={setData}
        modal={deleteModal}
        setModal={setDeleteModal}
      />
    </>
  );
};

export default RolesTab;
