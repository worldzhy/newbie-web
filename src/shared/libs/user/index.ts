import axiosInstance from '@/shared/libs/axiosInstance';
import { type IRole } from '@/shared/libs/role';
import { getCookie } from 'cookies-next';

export default class User {
  private readonly baseUrl = `${process.env.BASE_URL ?? ''}/users`;
  private readonly accessToken = getCookie('token');

  public async get(): Promise<IUserOutput> {
    const url = `${this.baseUrl}?pageSize=100&page=1&roleId=1&name=1`;
    const config = {
      headers: {
        Authorization: `Bearer ${this.accessToken as string}`,
      },
    };
    const res = await axiosInstance.get(url, config);
    return res.data;
  }
}

/**
 * Types
 */

export interface IUser {
  id: string;
  email: string | null;
  phone: string | null;
  username: string;
  status: string;
  lastLoginAt: string;
  createdAt: string;
  updatedAt: string;
  organizationId: null | string;
  profiles: [];
  locations: [];
  roles: IRole[];
}

interface IUserOutput {
  records: IUser[];
  pagination: {
    page: number;
    pageSize: number;
    currentNumberOfRecords: number;
    totalNumberOfRecords: number;
  };
}
