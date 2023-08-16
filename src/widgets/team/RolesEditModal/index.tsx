import {type FC, useState, useEffect, useReducer} from 'react';
import {Role} from '@prisma/client';
import {Stack} from '@mui/material';
import {raise, sendRequest, showError} from '@/http/mixins';
import RoleService from '@/http/api/role';
import FormDialogCustom from '@/components/FormDialogCustom';
import FormDialogInputCustom from '@/components/FormDialogInputCustom';

/**
 * Types
 */

interface Props {
  activeRole: Role | undefined;
  data: Role[];
  setData: React.Dispatch<React.SetStateAction<Role[]>>;
  modal: boolean;
  setModal: React.Dispatch<React.SetStateAction<boolean>>;
}

interface INewRole {
  name: string;
  description: string;
}

const RolesEditModal: FC<Props> = ({
  activeRole,
  data,
  setData,
  modal,
  setModal,
}) => {
  const [isProcessing, setIsProcessing] = useState(false);
  const [updatedActiveRole, setUpdatedActiveRole] = useReducer(
    (prev: INewRole, next: Record<string, string>): INewRole => {
      return {...prev, ...next};
    },
    {
      name: '',
      description: '',
    }
  );

  useEffect(() => {
    const startFetching = async (): Promise<void> => {
      try {
        if (!ignore) {
          if (!activeRole?.id) return;
          const {name, description} = activeRole;
          setUpdatedActiveRole({
            name,
            description: description ?? '',
          });
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
  }, [activeRole]);

  const updateRole = async (): Promise<void> => {
    await sendRequest(setIsProcessing, async () => {
      const role = await RoleService.update(
        raise(activeRole?.id),
        updatedActiveRole
      );
      setData(
        data.map(d => {
          if (d.id === activeRole?.id) {
            return {
              ...d,
              ...role,
            };
          }
          return d;
        })
      );
      setModal(false);
    });
  };

  return (
    <FormDialogCustom
      open={modal}
      title={`Edit ${activeRole?.name ?? ''}`}
      closeDialogHandler={() => {
        setModal(false);
      }}
      formSubmitHandler={updateRole}
      isProcessing={isProcessing}
    >
      <Stack spacing={{xs: 2, sm: 1}}>
        <FormDialogInputCustom
          label="Name"
          value={updatedActiveRole.name}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            setUpdatedActiveRole({name: e.target.value});
          }}
        ></FormDialogInputCustom>
        <FormDialogInputCustom
          label="Description"
          multiline={true}
          rows={3}
          value={updatedActiveRole.description}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            setUpdatedActiveRole({description: e.target.value});
          }}
        ></FormDialogInputCustom>
      </Stack>
    </FormDialogCustom>
  );
};

export default RolesEditModal;
