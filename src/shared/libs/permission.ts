import axios from 'axios';
import { getCookie } from 'cookies-next';

export default class Permission {
  private readonly baseUrl = `${process.env.BASE_URL ?? ''}/permissions`;
  private readonly accessToken = getCookie('token');

  public async get (): Promise<IPermissionSummaryItem[]> {
    const resources = await this.getResources();
    const actions = await this.getActions();
    const permissionsSummary: IPermissionSummaryItem[] = [];

    for (const resource of resources) {
      const permissions = await this.getPermissionOfResource(resource);
      const permissionsItem: IPermissionSummaryItem = {
        resource,
        permission: {}
      };
      for (const action of actions) {
        if (permissions.find(p => p.resource === resource && p.action === action) !== undefined) {
          permissionsItem.permission[action] = true;
        } else {
          permissionsItem.permission[action] = false;
        }
      }
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
