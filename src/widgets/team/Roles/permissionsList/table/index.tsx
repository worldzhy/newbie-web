import React, { type ReactElement, type FC } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Skeleton,
  Stack,
  FormGroup,
  FormControlLabel,
} from '@mui/material';
import styleConfig from '@/constants/styleConfig';
import CheckboxCustom from '@/components/CheckboxCustom';

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

const TablePermission: FC<Props> = ({
  data,
  onChangeHandler,
}): ReactElement => {
  /**
   * Declarations
   */
  const headers = ['Resouce', 'Permission'];

  const skeleton = (
    <Stack direction="column" spacing={1}>
      {Array.from(new Array(3)).map((_, key: number) => (
        <Skeleton key={key} variant="rounded" animation="wave" height={60} />
      ))}
    </Stack>
  );

  const table = (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow
            sx={{
              backgroundColor: `${styleConfig.color.primaryGrayColor}`,
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
            {headers.map((label: string, key: number) => (
              <TableCell key={key} align="center">
                {label}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {data
            .sort((a, b) => a.resource.localeCompare(b.resource))
            .map(({ resource, permissions }, key) => (
              <TableRow
                key={key}
                sx={{
                  '& td, & th': {
                    border: `2px solid ${styleConfig.color.primaryBlackColor}`,
                  },
                  '& th': {
                    color: `${styleConfig.color.primaryGrayColor}`,
                    fontSize: '14px',
                    fontWeight: '400',
                  },
                }}
              >
                <TableCell align="center">{resource}</TableCell>
                <TableCell align="center">
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
                </TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </TableContainer>
  );

  return data.length === 0 ? skeleton : table;
};

export default TablePermission;
