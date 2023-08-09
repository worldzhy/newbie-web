import React, {useEffect, type ReactElement, useState} from 'react';
import {sortDate, showError, delayExecute, isUnauthorized} from '@/http/mixins';
import {useRouter} from 'next/router';
import {Button, Link, Stack, TableCell, TableRow} from '@mui/material';
import MembersEditModal from '../MembersEditModal';
import MembersCreateModal from '../MembersCreateModal';
import MembersDeleteModal from '../MembersDeleteModal';
import SkeletonCustom from '@/components/SkeletonCustom';
import TableContainerCustom from '@/components/TableContainerCustom';
import {User, Role} from '@prisma/client';
import UserApiRequest from '@/http/api/user';
import RoleApiRequest from '@/http/api/role';

/**
 * Types
 */

const MembersTab = (): ReactElement => {
  /**
   * Declarations
   */
  const router = useRouter();
  const headers = ['Name', 'Email', 'Phone', 'Role', 'Actions'];
  const [rolesList, setRolesList] = useState<Role[]>([]);

  /**
   * States
   */
  const [data, setData] = useState<(User & {roles: Role[]})[]>([]);
  const [isFetching, setIsFetching] = useState(true);
  const [createModal, setCreateModal] = useState(false);
  const [editModal, setEditModal] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const [activeMember, setActiveMember] = useState<User & {roles: Role[]}>();

  /**
   * Data Fetching
   */
  useEffect(() => {
    const startFetching = async (): Promise<void> => {
      try {
        setData([]);
        setRolesList([]);
        if (!ignore) {
          const users = await new UserApiRequest().list({
            page: 1,
            pageSize: 10,
          });
          setData(users.records);

          const roles = await new RoleApiRequest().list();
          setRolesList(roles);

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
        .map((d, rowKey) => (
          <TableRow key={rowKey}>
            <TableCell align="center">{d.name}</TableCell>
            <TableCell align="center">{d.email}</TableCell>
            <TableCell align="center">{d.phone}</TableCell>
            <TableCell align="center">
              {d.roles.map(r => r.name).join(', ')}
            </TableCell>
            <TableCell align="center">
              <Link
                onClick={() => {
                  setActiveMember(d);
                  setEditModal(true);
                }}
                style={{marginRight: 6}}
              >
                Edit
              </Link>
              <Link
                onClick={() => {
                  setActiveMember(d);
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
          New member
        </Button>
        {isFetching ? <SkeletonCustom /> : table}
      </Stack>
      <MembersCreateModal
        data={data}
        setData={setData}
        modal={createModal}
        setModal={setCreateModal}
        rolesList={rolesList}
      />
      <MembersEditModal
        activeMember={activeMember}
        data={data}
        setData={setData}
        modal={editModal}
        setModal={setEditModal}
        rolesList={rolesList}
      />
      <MembersDeleteModal
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
