import React, { useEffect, type ReactElement, useState } from 'react';
import { useRouter } from 'next/router';
import TableCustom from '@/components/TableCustom';
import User from '@/shared/libs/user';
import {
  delayExecute,
  isUnauthorized,
  sendRequest,
  showError,
} from '@/shared/libs/mixins';
import { Stack } from '@mui/material';
import ButtonCustom from '@/components/ButtonCustom';
import FormDialogCustom from '@/components/FormDialogCustom';
import FormDialogInputCustom from '@/components/FormDialogInputCustom';

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
  const [modal, setModal] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [fetch, setFetch] = useState(false);
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

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
          if (isUnauthorized(err)) {
            delayExecute(() => {
              void router.push('/');
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
  }, []);

  /**
   * Handlers
   */
  const createRole = async (): Promise<void> => {
    await sendRequest(setIsProcessing, async () => {
      // To do: Add class method
    });
    setFetch(!fetch);
    setModal(false);
  };

  return (
    <>
      <Stack direction="column" spacing={2} alignItems="flex-end">
        <ButtonCustom
          customColor="dark"
          onClick={() => {
            setModal(true);
          }}
        >
          New member
        </ButtonCustom>
        <TableCustom
          headers={headers}
          rows={data}
          isLastColActions={false}
        ></TableCustom>
      </Stack>
      <FormDialogCustom
        open={modal}
        title="New member"
        closeDialogHandler={() => {
          setModal(false);
        }}
        formSubmitHandler={createRole}
        isProcessing={isProcessing}
      >
        <Stack spacing={1}>
          <FormDialogInputCustom
            label="Email"
            type="email"
            value={email}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              setEmail(e.target.value);
            }}
          ></FormDialogInputCustom>
          <FormDialogInputCustom
            label="Phone"
            value={phone}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              setPhone(e.target.value);
            }}
          ></FormDialogInputCustom>
          <FormDialogInputCustom
            label="Username"
            value={username}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              setUsername(e.target.value);
            }}
          ></FormDialogInputCustom>
          <FormDialogInputCustom
            label="Password"
            value={password}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              setPassword(e.target.value);
            }}
          ></FormDialogInputCustom>
        </Stack>
      </FormDialogCustom>
    </>
  );
};

export default TeamMembers;
