import axiosInstance from "@/shared/libs/axiosInstance";

export default class Permission {
  private readonly baseUrl = "/permissions";

  public async get(roleId: string): Promise<IPermissionsByResources[]> {
    // Get list of all resources, actions, and permissions
    const [resources, actions, permissionsAll] = await Promise.all([
      this.getResources(),
      this.getActions(),
      this.getAllPermissions(),
    ]);
    const permissions = permissionsAll.filter(
      (p) => p.trustedEntityId === roleId
    );

    // Construct base summary object which contains summary of permissions by resources
    const permissionsByResources: IPermissionsByResources[] = resources.map(
      (resource) => {
        return {
          resource,
          permissions: actions.map((action) => ({
            id: null,
            action,
            allow: false,
          })),
        };
      }
    );

    // Begin updating summary object
    for (const permission of permissions) {
      const { id, action, resource } = permission;
      const resourceIndex = permissionsByResources.findIndex(
        (p) => p.resource === resource
      );

      if (resourceIndex === -1) {
        continue;
      }

      const actionIndex = permissionsByResources[
        resourceIndex
      ]?.permissions.findIndex((p) => p.action === action);

      if (actionIndex === -1 || actionIndex === undefined) {
        continue;
      }

      const { permissions } = permissionsByResources[resourceIndex] ?? {};
      const actionPermissions = permissions?.[actionIndex];

      if (actionPermissions) {
        actionPermissions.allow = true;
        actionPermissions.id = id;
      }
    }

    return permissionsByResources;
  }

  public async update(
    reqs: Map<string, IRequest>
  ): Promise<Array<ICreateUserResponse | IDeleteUserResponse>> {
    const reqsArray = Array.from(reqs);
    return await Promise.all(
      reqsArray.map(async ([_, data]) => {
        const { change, resource, resourceId, action, roleId } = data;
        if (change === "add") {
          // eslint-disable-next-line @typescript-eslint/return-await
          return this.create(resource, action, roleId);
        } else {
          if (resourceId === null) {
            throw new Error("No resource id found.");
          }
          // eslint-disable-next-line @typescript-eslint/return-await
          return this.delete(resourceId);
        }
      })
    );
  }

  public async create(
    resource: string,
    action: string,
    roleId: string
  ): Promise<ICreateUserResponse> {
    const url = this.baseUrl;
    const data = {
      resource,
      action,
      where: {
        state: {
          in: ["StateA", "StateB"],
        },
      },
      trustedEntityType: "USER",
      trustedEntityId: roleId,
    };
    const res = await axiosInstance.post(url, data);
    return { ...res.data, change: "Create" };
  }

  public async delete(permissionId: number): Promise<IDeleteUserResponse> {
    const url = `${this.baseUrl}/${permissionId}`;
    const res = await axiosInstance.delete(url);
    return { ...res.data, change: "Delete" };
  }

  private async getResources(): Promise<string[]> {
    const url = `${this.baseUrl}/resources`;
    const res = await axiosInstance.get(url);
    return res.data;
  }

  private async getActions(): Promise<string[]> {
    const url = `${this.baseUrl}/actions`;
    const res = await axiosInstance.get(url);
    return res.data;
  }

  private async getPermissionOfResource(
    resource: string
  ): Promise<IPermission[]> {
    const url = `${this.baseUrl}?resource=${resource}`;
    const res = await axiosInstance.get(url);
    return res.data;
  }

  private async getAllPermissions(): Promise<IPermission[]> {
    const url = this.baseUrl;
    const res = await axiosInstance.get(url);
    return res.data;
  }
}

/**
 * Types
 */

interface IPermission {
  id: number;
  action: string;
  resource: string;
  where: null;
  inverted: null;
  reason: null;
  trustedEntityType: string;
  trustedEntityId: string;
  createdAt: string;
  updatedAt: string;
}

export interface IPermissionsByResources {
  resource: string;
  permissions: Array<{
    id: number | null;
    action: string;
    allow: boolean;
  }>;
}

export interface IRequest {
  change: "add" | "delete";
  resourceId: number | null;
  resource: string;
  action: string;
  roleId: string;
}

interface ICreateUserResponse extends Omit<IPermission, "where"> {
  change: "Create";
}

interface IDeleteUserResponse extends Omit<IPermission, "where"> {
  change: "Delete";
}
