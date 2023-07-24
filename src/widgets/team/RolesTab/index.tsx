import React, {type ReactElement, useEffect, useState} from 'react';
import {useRouter} from 'next/router';
import {Stack} from '@mui/material';
import ButtonCustom from '@/components/ButtonCustom';
import {
  delayExecute,
  isUnauthorized,
  showError,
  sortDate,
} from '@/shared/libs/mixins';
import Role, {type IRole} from '@/shared/libs/role';
import RolesSetPermisssionsModal from '../RolesSetPermisssionsModal';
import TableCellCustom from '@/components/TableCellCustom';
import SkeletonCustom from '@/components/SkeletonCustom';
import RolesCreateModal from '../RolesCreateModal';
import TableContainerCustom from '@/components/TableContainerCustom';
import TableRowCustom from '@/components/TableRowCustom';
import RolesEditModal from '../RolesEditModal';
import RolesDeleteModal from '../RolesDeleteModal';

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
          <TableRowCustom key={key}>
            <TableCellCustom>{d.name}</TableCellCustom>
            <TableCellCustom>{d.description}</TableCellCustom>
            <TableCellCustom>
              <ButtonCustom
                customColor="link"
                onClick={() => {
                  setActiveRole(d);
                  setEditModal(true);
                }}
              >
                Edit
              </ButtonCustom>
              <ButtonCustom
                customColor="link"
                onClick={() => {
                  setActiveRole(d);
                  setPermissionModal(true);
                }}
              >
                Set Permissions
              </ButtonCustom>
              <ButtonCustom
                customColor="link"
                onClick={() => {
                  setActiveRole(d);
                  setDeleteModal(true);
                }}
              >
                Delete
              </ButtonCustom>
            </TableCellCustom>
          </TableRowCustom>
        ))}
    </TableContainerCustom>
  );

  return (
    <>
      <Stack direction="column" spacing={2} alignItems="flex-end">
        <ButtonCustom
          customColor="dark"
          onClick={() => {
            setCreateModal(true);
          }}
        >
          New role
        </ButtonCustom>
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
