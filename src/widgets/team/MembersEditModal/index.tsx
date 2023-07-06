import React, {
  useEffect,
  type ReactElement,
  useState,
  type FC,
  useReducer,
} from "react";
import { useRouter } from "next/router";
import { type IUser } from "@/shared/libs/user";
import {
  delayExecute,
  isUnauthorized,
  sendRequest,
  showError,
} from "@/shared/libs/mixins";
import { Stack } from "@mui/material";
import FormDialogCustom from "@/components/FormDialogCustom";
import FormDialogInputCustom from "@/components/FormDialogInputCustom";
import MultiSelectCustom from "@/components/MultiSelectCustom";
import Role, { type IRole } from "@/shared/libs/role";

/**
 * Types
 */

interface Props {
  activeMember: IUser | undefined;
  data: IUser[];
  setData: React.Dispatch<React.SetStateAction<IUser[]>>;
  modal: boolean;
  setModal: React.Dispatch<React.SetStateAction<boolean>>;
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
}): ReactElement => {
  /**
   * Declarations
   */
  const router = useRouter();

  /**
   * States
   */
  const [isProcessing, setIsProcessing] = useState(false);
  const [rolesList, setRolesList] = useState<IRole[]>([]);
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
        setRolesList([]);
        if (!ignore) {
          setSelectedRoleNames(activeMember?.roles.map((r) => r.name) ?? []);
          setUpdatedActiveMember({
            email: activeMember?.email ?? "",
            phone: activeMember?.phone ?? "",
            username: activeMember?.username ?? "",
            password: "",
          });

          const roles = await new Role().get();
          setRolesList(roles);
        }
      } catch (err: unknown) {
        if (!ignore) {
          if (isUnauthorized(err)) {
            delayExecute(() => {
              void router.push("/");
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
  }, [router, activeMember]);

  /**
   * Handlers
   */
  const editRole = async (): Promise<void> => {
    await sendRequest(setIsProcessing, async () => {
      // To do: Add edit role handler
      setModal(false); // To do: If there is validation issue, do not close modal. Applicable to all modal.
    });
  };

  return (
    <FormDialogCustom
      open={modal}
      title="New member"
      closeDialogHandler={() => {
        setModal(false);
      }}
      formSubmitHandler={editRole}
      isProcessing={isProcessing}
    >
      <Stack spacing={1}>
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
