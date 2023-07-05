import React, { useEffect, type ReactElement, useState } from 'react';
import { useRouter } from 'next/router';
import User from '@/shared/libs/user';
import { delayExecute, isUnauthorized, showError } from '@/shared/libs/mixins';
import { Stack } from '@mui/material';
import ButtonCustom from '@/components/ButtonCustom';
import TableContainerCustom from '@/components/TableContainerCustom';
import TableRowCustom from '@/components/TableRowCustom';
import TableCellCustom from '@/components/TableCellCustom';
import MembersAddModal from '../MembersAddModal';

/**
 * Types
 */

interface IData {
  name: string;
  email: string;
  phone: string;
  role: string;
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
  const [data, setData] = useState<IData[]>([]);
  const [modal, setModal] = useState(false);

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
            ({ username, email, phone, roles }) => {
              return {
                name: username,
                email: email ?? 'null',
                phone: phone ?? 'null',
                role: roles[0]?.name ?? 'null',
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
  }, []);

  return (
    <>
      <Stack direction="column" spacing={2} alignItems="flex-end">
        <ButtonCustom
          customColor="dark"
          onClick={() => {
            setModal(true);
          }}
        >
          New member
        </ButtonCustom>
        <TableContainerCustom headers={headers}>
          {data.map(({ name, email, phone, role }, rowKey) => (
            <TableRowCustom key={rowKey}>
              <TableCellCustom>{name}</TableCellCustom>
              <TableCellCustom>{email}</TableCellCustom>
              <TableCellCustom>{phone}</TableCellCustom>
              <TableCellCustom>{role}</TableCellCustom>
              <TableCellCustom>
                <ButtonCustom customColor="link" onClick={() => {}}>
                  Edit
                </ButtonCustom>
                <ButtonCustom customColor="link" onClick={() => {}}>
                  Delete
                </ButtonCustom>
              </TableCellCustom>
            </TableRowCustom>
          ))}
        </TableContainerCustom>
      </Stack>
      <MembersAddModal
        data={data}
        setData={setData}
        modal={modal}
        setModal={setModal}
      />
    </>
  );
};

export default MembersTab;
