import React, { type ReactElement } from 'react';
import TableCustom from '@/components/TableCustom';

// Panel 1 Data
const headers = ['Name', 'Email', 'Phone', 'Role'];

const createData = (
  name: string,
  email: string,
  phone: string,
  role: string
): { name: string; email: string; phone: string; role: string } => {
  return { name, email, phone, role };
};

const rows = [
  createData('hongbin', 'hongbin@inceptionpad.com', '13256484466', 'Developer'),
  createData('xiabin', 'xiabin@inceptionpad.com', '15605437789', 'Developer'),
  createData('joe', 'joe@inceptionpad.com', '18978545785', 'Developer'),
];

const TeamMembers = (): ReactElement => {
  return (
    <TableCustom
      headers={headers}
      rows={rows}
      isLastColActions={false}
    ></TableCustom>
  );
};

export default TeamMembers;
