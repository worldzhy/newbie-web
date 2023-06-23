import React, { type ReactElement } from 'react';
import TableCustom from '@/components/TableCustom/TableCustom';

// Panel 2 Data
const headers = ['Name', 'Description', 'Permissions'];

const createData = (
  name: string,
  description: string,
  permissions: string
): { name: string, description: string, permissions: string } => {
  return { name, description, permissions };
};

const rows = [
  createData('Developer', 'xxx', 'Edit'),
  createData('Product Owner', 'xxx', 'Edit'),
  createData('Administrator', 'xxx', 'Edit'),
  createData('Lead Developer', 'xxx', 'Edit')
];

const TeamRoles = (): ReactElement => {
  return (
    <TableCustom headers={headers} rows={rows} ></TableCustom>
  );
};

export default TeamRoles;
