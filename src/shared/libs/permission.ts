import axios from 'axios';
import { getCookie } from 'cookies-next';

export default class Permission {
  private readonly baseUrl = `${process.env.BASE_URL ?? ''}/permissions`;
  private readonly accessToken = getCookie('token');

  public async get(roleId: string): Promise<IPermissionsByResources[]> {
    // Get list of resources and actions
    const [resources, actions] = await Promise.all([
      this.getResources(),
      this.getActions(),
    ]);

    // Get list of permissions for each resource
    const permissionsValid: IPermission[][] = [];
    const permissionsAll = await Promise.allSettled(
      // eslint-disable-next-line @typescript-eslint/return-await
      resources.map(async (resource) => this.getPermissionOfResource(resource))
    );
    permissionsAll.forEach((p) => {
      if (p.status === 'fulfilled') {
        permissionsValid.push(p.value);
      }
    });

    // Prepare summary object which will contain summary of permissions by resources
    const permissionsByResources: IPermissionsByResources[] = [];

    // Begin building summary object. Tackling one resource at a time.
    for (const permissions of permissionsValid) {
      const resource = permissions[0].resource;
      const resourcePermissionItems: Array<{
        id: number | null;
        action: string;
        allow: boolean;
      }> = [];

      for (const action of actions) {
        const permission = permissions.find(
          (p) => p.trustedEntityId === roleId && p.action === action
        );
        if (permission !== undefined) {
          resourcePermissionItems.push({
            id: permission.id,
            action,
            allow: true,
          });
        } else {
          resourcePermissionItems.push({
            id: null,
            action,
            allow: false,
          });
        }
      }

      permissionsByResources.push({
        resource,
        permissions: resourcePermissionItems,
      });
    }

    return permissionsByResources;
  }

  public async addPermission(
    resource: string,
    action: string,
    roleId: string
  ): Promise<string[]> {
    const url = `${this.baseUrl}`;
    const config = {
      headers: {
        Authorization: `Bearer ${this.accessToken as string}`,
      },
    };
    const data = {
      resource,
      action,
      where: {
        state: {
          in: ['StateA', 'StateB'],
        },
      },
      trustedEntityType: 'USER',
      trustedEntityId: roleId,
    };
    const res = await axios.post(url, data, config);
    return res.data;
  }

  public async deletePermission(permissionId: number): Promise<string[]> {
    const url = `${this.baseUrl}/${permissionId}`;
    const config = {
      headers: {
        Authorization: `Bearer ${this.accessToken as string}`,
      },
    };
    const res = await axios.delete(url, config);
    return res.data;
  }

  private async getResources(): Promise<string[]> {
    const url = `${this.baseUrl}/resources`;
    const config = {
      headers: {
        Authorization: `Bearer ${this.accessToken as string}`,
      },
    };
    const res = await axios.get(url, config);
    return res.data;
  }

  private async getActions(): Promise<string[]> {
    const url = `${this.baseUrl}/actions`;
    const config = {
      headers: {
        Authorization: `Bearer ${this.accessToken as string}`,
      },
    };
    const res = await axios.get(url, config);
    return res.data;
  }

  private async getPermissionOfResource(
    resource: string
  ): Promise<IPermission[]> {
    const url = `${this.baseUrl}?resource=${resource}`;
    const config = {
      headers: {
        Authorization: `Bearer ${this.accessToken as string}`,
      },
    };
    const res = await axios.get(url, config);
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

interface IPermissionsByResources {
  resource: string;
  permissions: Array<{
    id: number | null;
    action: string;
    allow: boolean;
  }>;
}
