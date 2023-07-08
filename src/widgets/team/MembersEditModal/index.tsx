import React, {
  type ReactElement,
  useState,
  type FC,
  useReducer,
  useEffect,
} from "react";
import User, { type IUser } from "@/shared/libs/user";
import { raise, sendRequest, showError } from "@/shared/libs/mixins";
import { Stack } from "@mui/material";
import FormDialogCustom from "@/components/FormDialogCustom";
import FormDialogInputCustom from "@/components/FormDialogInputCustom";
import MultiSelectCustom from "@/components/MultiSelectCustom";
import { type IRole } from "@/shared/libs/role";

/**
 * Types
 */

interface Props {
  activeMember: IUser | undefined;
  data: IUser[];
  setData: React.Dispatch<React.SetStateAction<IUser[]>>;
  modal: boolean;
  setModal: React.Dispatch<React.SetStateAction<boolean>>;
  rolesList: IRole[];
}

interface INewMember {
  email: string;
  phone: string;
  username: string;
  password: string;
}

const MembersEditModal: FC<Props> = ({
  activeMember,
  data,
  setData,
  modal,
  setModal,
  rolesList,
}): ReactElement => {
  /**
   * States
   */
  const [isProcessing, setIsProcessing] = useState(false);
  const [selectedRoleNames, setSelectedRoleNames] = useState<string[]>([]);
  const [updatedActiveMember, setUpdatedActiveMember] = useReducer(
    (prev: INewMember, next: Record<string, string>): INewMember => {
      return { ...prev, ...next };
    },
    {
      email: "",
      phone: "",
      username: "",
      password: "",
    }
  );

  /**
   * Data Fetching
   */
  useEffect(() => {
    const startFetching = async (): Promise<void> => {
      try {
        if (!ignore) {
          setSelectedRoleNames(activeMember?.roles.map((r) => r.name) ?? []);
          setUpdatedActiveMember({
            email: activeMember?.email ?? "",
            phone: activeMember?.phone ?? "",
            username: activeMember?.username ?? "",
            password: "",
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
  }, [activeMember]);

  /**
   * Handlers
   */
  const editRole = async (): Promise<void> => {
    await sendRequest(setIsProcessing, async () => {
      const { email, phone, username, password } = updatedActiveMember;
      const roles = rolesList.filter(({ name }) =>
        selectedRoleNames.includes(name)
      );
      const payload = {
        email,
        phone,
        username,
        password,
        roles,
      };
      await new User().update(raise(activeMember?.id), payload);
      setData(
        data.map((d) => {
          if (d.id === activeMember?.id) {
            return {
              ...d,
              ...payload,
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
      title={`Edit ${activeMember?.username ?? ""}`}
      closeDialogHandler={() => {
        setModal(false);
      }}
      formSubmitHandler={editRole}
      isProcessing={isProcessing}
    >
      <Stack spacing={{ xs: 2, sm: 1 }}>
        <FormDialogInputCustom
          label="Email"
          type="email"
          value={updatedActiveMember.email}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            setUpdatedActiveMember({ email: e.target.value });
          }}
        ></FormDialogInputCustom>
        <FormDialogInputCustom
          label="Phone"
          value={updatedActiveMember.phone}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            setUpdatedActiveMember({ phone: e.target.value });
          }}
        ></FormDialogInputCustom>
        <FormDialogInputCustom
          label="Username"
          value={updatedActiveMember.username}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            setUpdatedActiveMember({ username: e.target.value });
          }}
        ></FormDialogInputCustom>
        <FormDialogInputCustom
          placeholder="********"
          label="Password"
          value={updatedActiveMember.password}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            setUpdatedActiveMember({ password: e.target.value });
          }}
        ></FormDialogInputCustom>
        <MultiSelectCustom
          label="Roles"
          options={rolesList.map((r) => r.name)}
          selected={selectedRoleNames}
          setSelected={setSelectedRoleNames}
        />
      </Stack>
    </FormDialogCustom>
  );
};

export default MembersEditModal;
