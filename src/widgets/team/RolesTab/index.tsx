import React, { type ReactElement, useEffect, useState } from "react";
import { useRouter } from "next/router";
import { Stack } from "@mui/material";
import ButtonCustom from "@/components/ButtonCustom";
import { delayExecute, isUnauthorized, showError } from "@/shared/libs/mixins";
import Role, { type IRole } from "@/shared/libs/role";
import RolesPermissionsModal from "../RolesPermisssionsModal";
import TableCellCustom from "@/components/TableCellCustom";
import TableSkeletonCustom from "@/components/TableSkeletonCustom";
import RolesCreateModal from "../RolesCreateModal";
import TableContainerCustom from "@/components/TableContainerCustom";
import TableRowCustom from "@/components/TableRowCustom";

const RolesTab = (): ReactElement => {
  /**
   * Declarations
   */
  const router = useRouter();
  const headers = ["Name", "Description", "Permissions"];

  /**
   * States
   */
  const [isFetching, setIsFetching] = useState(true);
  const [createModal, setCreateModal] = useState(false);
  const [permissionModal, setPermissionModal] = useState(false);
  const [activeRole, setActiveRole] = useState<{
    id?: string;
    name?: string;
  }>({});
  const [data, setData] = useState<IRole[]>([]);

  /**
   * Data Fetching
   */
  useEffect(() => {
    const startFetching = async (): Promise<void> => {
      try {
        setData([]);
        if (!ignore) {
          const roles = await new Role().get();
          setData(roles);
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
      {data.map((d, key) => (
        <TableRowCustom key={key}>
          <TableCellCustom>{d.name}</TableCellCustom>
          <TableCellCustom>{d.description}</TableCellCustom>
          <TableCellCustom>
            <ButtonCustom
              customColor="link"
              onClick={() => {
                setActiveRole(d);
                setPermissionModal(true);
              }}
            >
              Edit
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
        {isFetching ? <TableSkeletonCustom /> : table}
      </Stack>
      <RolesCreateModal
        data={data}
        setData={setData}
        modal={createModal}
        setModal={setCreateModal}
      />
      <RolesPermissionsModal
        activeRole={activeRole}
        setPermissionModal={setPermissionModal}
        permissionModal={permissionModal}
      />
    </>
  );
};

export default RolesTab;
