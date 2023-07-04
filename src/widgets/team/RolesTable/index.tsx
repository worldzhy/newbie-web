import React, { type ReactElement, type FC } from 'react';
import ButtonCustom from '@/components/ButtonCustom';
import TableSkeletonCustom from '@/components/TableSkeletonCustom';
import TableContainerCustom from '@/components/TableContainerCustom';
import TableRowCustom from '@/components/TableRowCustom';
import TableCellCustom from '@/components/TableCellCustom';

interface Props {
  rows: Array<{
    id: string;
    name: string;
    description: string;
  }>;
  setActiveRole: React.Dispatch<
    React.SetStateAction<{
      id?: string;
      name?: string;
    }>
  >;
  setPermissionModal: React.Dispatch<React.SetStateAction<boolean>>;
}

const RolesTable: FC<Props> = ({
  rows,
  setActiveRole,
  setPermissionModal,
}): ReactElement => {
  /**
   * Declarations
   */
  const headers = ['Name', 'Description', 'Permissions'];

  const table = (
    <TableContainerCustom headers={headers}>
      {rows.map((row, key) => (
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

  return rows.length === 0 ? <TableSkeletonCustom /> : table;
};

export default RolesTable;
