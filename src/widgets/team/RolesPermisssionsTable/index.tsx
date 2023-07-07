import React, { type ReactElement, type FC } from "react";
import { FormGroup, FormControlLabel } from "@mui/material";
import CheckboxCustom from "@/components/CheckboxCustom";
import TableContainerCustom from "@/components/TableContainerCustom";
import TableRowCustom from "@/components/TableRowCustom";
import TableCellCustom from "@/components/TableCellCustom";
import TableSkeletonCustom from "@/components/TableSkeletonCustom";

/**
 *
 * Table responsible for showing the per role (as identified by roleId) permissions against resources.
 * To use this table, provide roleId in props. This component will do the data fetching of the permissions here.
 * This component is used in Team > Roles > Edit page.
 *
 **/

/**
 * Types
 */

interface Props {
  data: IPermissionByResource[];
  onChangeHandler: (
    resource: string,
    action: string,
    id: number | null
  ) => void;
}

interface IPermissionByResource {
  resource: string;
  permissions: Array<{
    id: number | null;
    action: string;
    allow: boolean;
  }>;
}

const RolesPermisssionsTable: FC<Props> = ({
  data,
  onChangeHandler,
}): ReactElement => {
  /**
   * Declarations
   */
  const headers = ["Resouce", "Permission"];

  const table = (
    <TableContainerCustom headers={headers}>
      {data
        .sort((a, b) => a.resource.localeCompare(b.resource))
        .map(({ resource, permissions }, key) => (
          <TableRowCustom key={key}>
            <TableCellCustom>{resource}</TableCellCustom>
            <TableCellCustom>
              <FormGroup row={true}>
                {permissions.map((p, key: number) => (
                  <FormControlLabel
                    key={key}
                    control={
                      <CheckboxCustom
                        checked={p.allow}
                        onChange={() => {
                          onChangeHandler(resource, p.action, p.id);
                        }}
                      />
                    }
                    label={p.action}
                  />
                ))}
              </FormGroup>
            </TableCellCustom>
          </TableRowCustom>
        ))}
    </TableContainerCustom>
  );

  return data.length === 0 ? <TableSkeletonCustom /> : table;
};

export default RolesPermisssionsTable;
