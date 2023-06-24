import axios from 'axios';
import { getCookie } from 'cookies-next';

export default class Permission {
  private readonly baseUrl = `${process.env.BASE_URL ?? ''}/permissions`;
  private readonly accessToken = getCookie('token');

  public async get (roleId: string): Promise<IPermissionSummaryItem[]> {
    const [resources, actions] = await Promise.all([this.getResources(), this.getActions()]);
    // eslint-disable-next-line @typescript-eslint/return-await
    const permissionsAll = await Promise.allSettled(resources.map(async (resource) => this.getPermissionOfResource(resource)));

    // Process only resources that have valid query results
    const permissions: IPermission[][] = [];
    permissionsAll.forEach(p => {
      if (p.status === 'fulfilled') {
        permissions.push(p.value);
      }
    });

    // Prepare summary object
    const permissionsSummary: IPermissionSummaryItem[] = [];

    // Cross check permission to role and action
    for (const resourcePermissions of permissions) {
      const resource = resourcePermissions[0].resource;
      // Prepare permission item
      const permissionsItem: IPermissionSummaryItem = {
        resource,
        permission: {}
      };
      for (const action of actions) {
        // Populate permission item by checking if permission is present for specific resource and item
        if (resourcePermissions.find(p => p.trustedEntityId === roleId && p.action === action) !== undefined) {
          permissionsItem.permission[action] = true;
        } else {
          permissionsItem.permission[action] = false;
        }
      }
      // Add permission item to summary object
      permissionsSummary.push(permissionsItem);
    }

    return permissionsSummary;
  }

  private async getResources (): Promise<string[]> {
    const url = `${this.baseUrl}/resources`;
    const config = {
      headers: {
        Authorization: `Bearer ${this.accessToken as string}`
      }
    };
    const res = await axios.get(url, config);
    return res.data;
  }

  private async getActions (): Promise<string[]> {
    const url = `${this.baseUrl}/actions`;
    const config = {
      headers: {
        Authorization: `Bearer ${this.accessToken as string}`
      }
    };
    const res = await axios.get(url, config);
    return res.data;
  }

  private async getPermissionOfResource (resource: string): Promise<IPermission[]> {
    const url = `${this.baseUrl}?resource=${resource}`;
    const config = {
      headers: {
        Authorization: `Bearer ${this.accessToken as string}`
      }
    };
    const res = await axios.get(url, config);
    return res.data;
  }
}

/**
 * Types
 */

interface IPermission {
  id: number
  action: string
  resource: string
  where: null
  inverted: null
  reason: null
  trustedEntityType: string
  trustedEntityId: string
  createdAt: string
  updatedAt: string
}

interface IPermissionSummaryItem {
  resource: string
  permission: Record<any, boolean>
};
