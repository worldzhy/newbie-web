import React, { useEffect, type ReactElement, useState } from "react";
import { useRouter } from "next/router";
import User, { type IUser } from "@/shared/libs/user";
import {
  delayExecute,
  isUnauthorized,
  showError,
  sortDate,
} from "@/shared/libs/mixins";
import { Stack } from "@mui/material";
import ButtonCustom from "@/components/ButtonCustom";
import TableContainerCustom from "@/components/TableContainerCustom";
import TableRowCustom from "@/components/TableRowCustom";
import TableCellCustom from "@/components/TableCellCustom";
import MembersCreateModal from "../MembersCreateModal";
import MembersEditModal from "../MembersEditModal";
import TableSkeletonCustom from "@/components/TableSkeletonCustom";
import Role, { type IRole } from "@/shared/libs/role";
import MembersDeleteModal from "../MembersDeleteModal";

/**
 * Types
 */

const MembersTab = (): ReactElement => {
  /**
   * Declarations
   */
  const router = useRouter();
  const headers = ["Name", "Email", "Phone", "Role", "Actions"];
  const [rolesList, setRolesList] = useState<IRole[]>([]);

  /**
   * States
   */
  const [data, setData] = useState<IUser[]>([]);
  const [isFetching, setIsFetching] = useState(true);
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
        setRolesList([]);
        if (!ignore) {
          const users = await new User().get();
          setData(users.records);

          const roles = await new Role().get();
          setRolesList(roles);

          setIsFetching(false);
        }
      } catch (err: unknown) {
        if (!ignore) {
          if (isUnauthorized(err)) {
            delayExecute(() => {
              void router.push("/");
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
          <TableRowCustom key={rowKey}>
            <TableCellCustom>{d.username}</TableCellCustom>
            <TableCellCustom>{d.email}</TableCellCustom>
            <TableCellCustom>{d.phone}</TableCellCustom>
            <TableCellCustom>
              {d.roles.map((r) => r.name).join(", ")}
            </TableCellCustom>
            <TableCellCustom>
              <ButtonCustom
                customColor="link"
                onClick={() => {
                  setActiveMember(d);
                  setEditModal(true);
                }}
              >
                Edit
              </ButtonCustom>
              <ButtonCustom
                customColor="link"
                onClick={() => {
                  setActiveMember(d);
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
          New member
        </ButtonCustom>
        {isFetching ? <TableSkeletonCustom /> : table}
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
