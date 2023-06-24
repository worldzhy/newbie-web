import axios from 'axios';
import { getCookie } from 'cookies-next';

export default class Permission {
  private readonly baseUrl = `${process.env.BASE_URL ?? ''}/permissions`;
  private readonly accessToken = getCookie('token');

  public async get (): Promise<IPermissionSummaryItem[]> {
    const [resources, actions] = await Promise.all([this.getResources(), this.getActions()]);
    const permissionsSummary: IPermissionSummaryItem[] = [];

    const tasks = resources.map(async (resource) => {
      // Get permissions associated with the resource
      const permissions = await this.getPermissionOfResource(resource);
      // Prepare permission item
      const permissionsItem: IPermissionSummaryItem = {
        resource,
        permission: {}
      };
      for (const action of actions) {
        // Populate permission item by checking if permission is present for specific resource and item
        if (permissions.find(p => p.resource === resource && p.action === action) !== undefined) {
          permissionsItem.permission[action] = true;
        } else {
          permissionsItem.permission[action] = false;
        }
      }
      // Add permission item to summary object
      permissionsSummary.push(permissionsItem);
    });
    await Promise.allSettled(tasks);

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
    const url = `${this.baseUrl}?resources=${resource}`;
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
