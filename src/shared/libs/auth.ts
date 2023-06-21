import axios from 'axios';
import { setCookie } from 'cookies-next';

export default class Auth {
  private readonly baseUrl = `${process.env.BASE_URL ?? ''}/account`;

  public async login (input: ILoginPayload): Promise<ILoginReturn> {
    const url = `${this.baseUrl}/login/password`;
    const data = {
      account: input.account,
      password: input.password
    };
    const res = await axios.post(url, data);
    setCookie('token', res.data.token);
    return res.data;
  }
}

/**
 * Types
 */

interface ILoginPayload {
  account: string
  password: string
}

interface ILoginReturn {
  id: number
  userId: string
  token: string
  status: string
  createdAt: string
  updatedAt: string
}
