import axiosInstance from '@/shared/libs/axiosInstance';
import { getCookie } from 'cookies-next';

export default class Role {
  private readonly baseUrl = `${process.env.BASE_URL ?? ''}/roles`;
  private readonly accessToken = getCookie('token');

  public async get(): Promise<IRole[]> {
    const url = this.baseUrl;
    const config = {
      headers: {
        Authorization: `Bearer ${this.accessToken as string}`,
      },
    };
    const res = await axiosInstance.get(url, config);
    return res.data;
  }

  public async create(name: string): Promise<IRole> {
    const url = this.baseUrl;
    const data = { name };
    const config = {
      headers: {
        Authorization: `Bearer ${this.accessToken as string}`,
      },
    };
    const res = await axiosInstance.post(url, data, config);
    return res.data;
  }
}

/**
 * Types
 */

export interface IRole {
  id: string;
  name: string;
  description: string | null;
  createdAt: string;
  updatedAt: string;
  organizationId: string | null;
}
