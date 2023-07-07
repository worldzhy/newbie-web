import React, { type ReactElement, useEffect, useState } from "react";
import { useRouter } from "next/router";
import { Stack } from "@mui/material";
import ButtonCustom from "@/components/ButtonCustom";
import {
  delayExecute,
  isUnauthorized,
  sendRequest,
  showError,
} from "@/shared/libs/mixins";
import Role from "@/shared/libs/role";
import RolesPermissionsModal from "../RolesPermisssionsModal";
import FormDialogCustom from "@/components/FormDialogCustom";
import FormDialogInputCustom from "@/components/FormDialogInputCustom";
import TableContainerCustom from "@/components/TableContainerCustom";
import TableRowCustom from "@/components/TableRowCustom";
import TableCellCustom from "@/components/TableCellCustom";
import TableSkeletonCustom from "@/components/TableSkeletonCustom";

const RolesTab = (): ReactElement => {
  /**
   * Declarations
   */
  const router = useRouter();
  const headers = ["Name", "Description", "Permissions"];

  /**
   * States
   */
  const [isProcessing, setIsProcessing] = useState(false);
  const [isFetching, setIsFetching] = useState(true);
  const [roleModal, setRoleModal] = useState(false);
  const [roleName, setRoleName] = useState("");
  const [fetch, setFetch] = useState(false);
  const [permissionModal, setPermissionModal] = useState(false);
  const [activeRole, setActiveRole] = useState<{
    id?: string;
    name?: string;
  }>({});
  const [data, setData] = useState<
    Array<{
      id: string;
      name: string;
      description: string;
    }>
  >([]);

  /**
   * Data Fetching
   */
  useEffect(() => {
    const startFetching = async (): Promise<void> => {
      try {
        setData([]);
        if (!ignore) {
          const roles = await new Role().get();
          const fetcheddata = roles.map(({ id, name, description }) => {
            return { id, name, description: description ?? "xxx" };
          });
          setData(fetcheddata);
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
  }, [fetch]);

  /**
   * Handlers
   */
  const createRole = async (): Promise<void> => {
    await sendRequest(setIsProcessing, async () => {
      await new Role().create(roleName);
    });
    setFetch(!fetch);
    setRoleModal(false);
  };

  /**
   * Components
   */
  const table = (
    <TableContainerCustom headers={headers}>
      {data.map((row, key) => (
        <TableRowCustom key={key}>
          <TableCellCustom>{row.name}</TableCellCustom>
          <TableCellCustom>{row.description}</TableCellCustom>
          <TableCellCustom>
            <ButtonCustom
              customColor="link"
              onClick={() => {
                setActiveRole({ id: row.id, name: row.name });
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
            setRoleModal(true);
          }}
        >
          New role
        </ButtonCustom>
        {isFetching ? <TableSkeletonCustom /> : table}
      </Stack>
      <FormDialogCustom
        open={roleModal}
        title="New role"
        closeDialogHandler={() => {
          setRoleModal(false);
        }}
        formSubmitHandler={createRole}
        isProcessing={isProcessing}
      >
        <FormDialogInputCustom
          label="Name"
          value={roleName}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            setRoleName(e.target.value);
          }}
        ></FormDialogInputCustom>
      </FormDialogCustom>
      <RolesPermissionsModal
        activeRole={activeRole}
        setPermissionModal={setPermissionModal}
        permissionModal={permissionModal}
      />
    </>
  );
};

export default RolesTab;
