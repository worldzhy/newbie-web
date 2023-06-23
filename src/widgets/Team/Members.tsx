import React, { type ReactElement } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';

import styleConfig from '@/constants/styleConfig';

// Panel 1 Data
const createData = (
  name: string,
  email: string,
  phone: string,
  role: string
): { name: string, email: string, phone: string, role: string } => {
  return { name, email, phone, role };
};

const rows = [
  createData('hongbin', 'hongbin@inceptionpad.com', '13256484466', 'Developer'),
  createData('xiabin', 'xiabin@inceptionpad.com', '15605437789', 'Developer'),
  createData('joe', 'joe@inceptionpad.com', '18978545785', 'Developer')
];

const TeamMembers = (): ReactElement => {
  return (
        <TableContainer component={Paper} >
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow
              sx={{
                backgroundColor: `${styleConfig.color.primaryGrayColor}`,
                '& td, & th': { border: `2px solid ${styleConfig.color.primaryBlackColor}` },
                '& th': { color: `${styleConfig.color.primaryWhiteColor}`, fontSize: '14px', fontWeight: '700' }
              }}
            >
              <TableCell align='center'>Members</TableCell>
              <TableCell align='center'>Email</TableCell>
              <TableCell align='center'>Phone</TableCell>
              <TableCell align='center'>Role</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <TableRow
                key={row.name}
                sx={{
                  '& td, & th': { border: `2px solid ${styleConfig.color.primaryBlackColor}` },
                  '& th': { color: `${styleConfig.color.primaryGrayColor}`, fontSize: '14px', fontWeight: '400' }
                }}
              >
                <TableCell align='center'>{row.name}</TableCell>
                <TableCell align='center'>{row.email}</TableCell>
                <TableCell align='center'>{row.phone}</TableCell>
                <TableCell align='center'>{row.role}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
  );
};

export default TeamMembers;
