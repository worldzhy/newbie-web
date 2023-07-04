import React, { type ReactElement, type FC, type ReactNode } from 'react';
import { TableRow } from '@mui/material';
import styleConfig from '@/constants/styleConfig';

interface Props {
  children: ReactNode;
  type?: 'header' | 'body';
}

const TableRowCustom: FC<Props> = ({
  children,
  type = 'body',
}): ReactElement => {
  return (
    <TableRow
      sx={{
        ...(type === 'header' && {
          backgroundColor: `${styleConfig.color.primaryGrayColor}`,
        }),
        '& td, & th': {
          border: `2px solid ${styleConfig.color.primaryBlackColor}`,
        },
        '& th': {
          color: `${styleConfig.color.primaryWhiteColor}`,
          fontSize: '14px',
          fontWeight: '700',
        },
      }}
    >
      {children}
    </TableRow>
  );
};

export default TableRowCustom;
