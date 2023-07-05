import React, { useEffect, type ReactElement, useState } from 'react';
import { useRouter } from 'next/router';
import User from '@/shared/libs/user';
import { delayExecute, isUnauthorized, showError } from '@/shared/libs/mixins';
import { Stack } from '@mui/material';
import ButtonCustom from '@/components/ButtonCustom';
import TableContainerCustom from '@/components/TableContainerCustom';
import TableRowCustom from '@/components/TableRowCustom';
import TableCellCustom from '@/components/TableCellCustom';
import MembersCreateModal from '../MembersCreateModal';

/**
 * Types
 */

export interface IMember {
  id: string;
  username: string;
  email: string;
  phone: string;
  roleNames: string;
}

const MembersTab = (): ReactElement => {
  /**
   * Declarations
   */
  const router = useRouter();
  const headers = ['Name', 'Email', 'Phone', 'Role', 'Actions'];

  /**
   * States
   */
  const [data, setData] = useState<IMember[]>([]);
  const [createModal, setCreateModal] = useState(false);
  const [editModal, setEditModal] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const [activeMember, setActiveMember] = useState('');

  /**
   * Data Fetching
   */
  useEffect(() => {
    const startFetching = async (): Promise<void> => {
      try {
        setData([]);
        if (!ignore) {
          const users = await new User().get();
          const fetchedData = users.records.map(
            ({ id, username, email, phone, roles }) => {
              return {
                id,
                username: username ?? 'null',
                email: email ?? 'null',
                phone: phone ?? 'null',
                roleNames: roles[0]?.name ?? 'null',
              };
            }
          );
          setData(fetchedData);
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
        <TableContainerCustom headers={headers}>
          {data.map(({ id, username, email, phone, roleNames }, rowKey) => (
            <TableRowCustom key={rowKey}>
              <TableCellCustom>{username}</TableCellCustom>
              <TableCellCustom>{email}</TableCellCustom>
              <TableCellCustom>{phone}</TableCellCustom>
              <TableCellCustom>{roleNames}</TableCellCustom>
              <TableCellCustom>
                <ButtonCustom
                  customColor="link"
                  onClick={() => {
                    setEditModal(true);
                    setActiveMember(id);
                  }}
                >
                  Edit
                </ButtonCustom>
                <ButtonCustom
                  customColor="link"
                  onClick={() => {
                    setDeleteModal(true);
                    setActiveMember(id);
                  }}
                >
                  Delete
                </ButtonCustom>
              </TableCellCustom>
            </TableRowCustom>
          ))}
        </TableContainerCustom>
      </Stack>
      <MembersCreateModal
        data={data}
        setData={setData}
        modal={createModal}
        setModal={setCreateModal}
      />
    </>
  );
};

export default MembersTab;
