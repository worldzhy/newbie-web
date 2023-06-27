import React, { type ReactElement, type FC, useEffect, useState } from 'react';
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
  Checkbox,
} from '@mui/material';
import styleConfig from '@/constants/styleConfig';
import Permission from '@/shared/libs/permission';
import { showError } from '@/shared/libs/mixins';

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
  roleId: string;
}

const TablePermission: FC<Props> = ({ roleId }): ReactElement => {
  /**
   * Declarations
   */
  const headers = ['Resouce', 'Permission'];

  /**
   * States
   */
  const [data, setData] = useState<
    Array<{
      resource: string;
      permission: Record<any, boolean>;
    }>
  >([]);

  /**
   * Data Fetching
   */
  useEffect(() => {
    const startFetching = async (): Promise<void> => {
      try {
        setData([]);
        const permissions = await new Permission().get(roleId);
        if (!ignore) {
          setData(permissions);
        }
      } catch (err: unknown) {
        if (!ignore) {
          showError(err);
        }
      }
    };
    let ignore = false;
    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    startFetching();
    return () => {
      ignore = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  /**
   * Handlers
   */
  const onChangeHandler = (resource: string, action: string): void => {
    const updatedData = data.map((d) => {
      if (d.resource === resource) {
        d.permission[action] = !d.permission[action];
      }
      return d;
    });
    setData(updatedData);
  };

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
            .map((d, key) => (
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
                <TableCell align="center">{d.resource}</TableCell>
                <TableCell align="center">
                  <FormGroup row={true}>
                    {Object.keys(d.permission).map(
                      (action: string, key: number) => (
                        <FormControlLabel
                          key={key}
                          control={
                            <Checkbox
                              checked={d.permission[action]}
                              sx={{
                                color: `${styleConfig.color.primaryBlackColor}`,
                                '&.Mui-checked': {
                                  color: `${styleConfig.color.primaryBlackColor}`,
                                },
                              }}
                              onChange={() => {
                                onChangeHandler(d.resource, action);
                              }}
                            />
                          }
                          label={action}
                        />
                      )
                    )}
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
