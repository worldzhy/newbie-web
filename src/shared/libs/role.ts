import axios from 'axios';
import { getCookie } from 'cookies-next';

export default class Role {
  private readonly baseUrl = `${process.env.BASE_URL ?? ''}/roles`;
  private readonly accessToken = getCookie('token');

  public async get (): Promise<IRole[]> {
    const url = this.baseUrl;
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

interface IRole {
  id: string
  name: string
  description: string | null
  createdAt: string
  updatedAt: string
  organizationId: string | null
};
