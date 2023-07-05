import React, { useEffect, type ReactElement, useState } from 'react';
import { useRouter } from 'next/router';
import User, { type IUser } from '@/shared/libs/user';
import { delayExecute, isUnauthorized, showError } from '@/shared/libs/mixins';
import { Stack } from '@mui/material';
import ButtonCustom from '@/components/ButtonCustom';
import TableContainerCustom from '@/components/TableContainerCustom';
import TableRowCustom from '@/components/TableRowCustom';
import TableCellCustom from '@/components/TableCellCustom';
import MembersCreateModal from '../MembersCreateModal';
import MembersEditModal from '../MembersEditModal';
import TableSkeletonCustom from '@/components/TableSkeletonCustom';

/**
 * Types
 */

const MembersTab = (): ReactElement => {
  /**
   * Declarations
   */
  const router = useRouter();
  const headers = ['Name', 'Email', 'Phone', 'Role', 'Actions'];

  /**
   * States
   */
  const [data, setData] = useState<IUser[]>([]);
  const [dataFetch, setDataFetch] = useState(true);
  const [createModal, setCreateModal] = useState(false);
  const [editModal, setEditModal] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const [activeMember, setActiveMember] = useState<IUser>();

  /**
   * Data Fetching
   */
  useEffect(() => {
    const startFetching = async (): Promise<void> => {
      try {
        setData([]);
        if (!ignore) {
          const users = await new User().get();
          setData(users.records);
          setDataFetch(false);
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
      {data.map((d, rowKey) => (
        <TableRowCustom key={rowKey}>
          <TableCellCustom>{d.username}</TableCellCustom>
          <TableCellCustom>{d.email}</TableCellCustom>
          <TableCellCustom>{d.phone}</TableCellCustom>
          <TableCellCustom>
            {d.roles.map((r) => r.name).join(', ')}
          </TableCellCustom>
          <TableCellCustom>
            <ButtonCustom
              customColor="link"
              onClick={() => {
                setEditModal(true);
                setActiveMember(d);
              }}
            >
              Edit
            </ButtonCustom>
            <ButtonCustom
              customColor="link"
              onClick={() => {
                setDeleteModal(true);
                setActiveMember(d);
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
          New member
        </ButtonCustom>
        {dataFetch ? <TableSkeletonCustom /> : table}
      </Stack>
      <MembersCreateModal
        data={data}
        setData={setData}
        modal={createModal}
        setModal={setCreateModal}
      />
      <MembersEditModal
        activeMember={activeMember}
        data={data}
        setData={setData}
        modal={editModal}
        setModal={setEditModal}
      />
      <MembersEditModal
        activeMember={activeMember}
        data={data}
        setData={setData}
        modal={deleteModal}
        setModal={setDeleteModal}
      />
    </>
  );
};

export default MembersTab;
