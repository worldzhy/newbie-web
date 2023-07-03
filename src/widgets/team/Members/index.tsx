import React, { useEffect, type ReactElement, useState } from 'react';
import { useRouter } from 'next/router';
import TableCustom from '@/components/TableCustom';
import User from '@/shared/libs/user';
import { delayExecute, isUnauthorized, showError } from '@/shared/libs/mixins';

/**
 * Types
 */

interface IData {
  name: string;
  email: string;
  phone: string;
  role: string;
}

const TeamMembers = (): ReactElement => {
  /**
   * Declarations
   */
  const router = useRouter();
  const headers = ['Name', 'Email', 'Phone', 'Role'];

  /**
   * States
   */
  const [data, setData] = useState<IData[]>([]);

  /**
   * Data Fetching
   */
  useEffect(() => {
    const startFetching = async (): Promise<void> => {
      try {
        setData([]);
        if (!ignore) {
          const users = await new User().get();
          const fetchedData = users.records.map(
            ({ username, email, phone, roles }) => {
              return {
                name: username,
                email: email ?? 'null',
                phone: phone ?? 'null',
                role: roles[0]?.name ?? 'null',
              };
            }
          );
          setData(fetchedData);
        }
      } catch (err: unknown) {
        if (!ignore) {
          showError(err);
          if (isUnauthorized(err)) {
            delayExecute(() => {
              void router.push('/');
            });
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
  }, []);

  return (
    <TableCustom
      headers={headers}
      rows={data}
      isLastColActions={false}
    ></TableCustom>
  );
};

export default TeamMembers;
