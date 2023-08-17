import {setCookie} from 'cookies-next';
import {postRequest} from '@/http/methods';
import url from '@/http/url';

export default class Auth {
  public async login(input: ILoginPayload): Promise<ILoginReturn> {
    const data = {
      account: input.account,
      password: input.password,
    };
    const res = await postRequest(url.login, data);
    setCookie('token', res.data.token);
    return res.data;
  }

  public async sendVerificationCode(email: string): Promise<boolean> {
    const res = await postRequest(url.sendVerificationCode, {
      email,
      use: 'RESET_PASSWORD',
    });
    return res.data;
  }

  public async forgotPassword(
    payload: IForgotPasswordPayload
  ): Promise<IForgotPasswordReturn> {
    const {email, verificationCode, newPassword} = payload;
    const data = {
      email,
      verificationCode,
      newPassword,
    };
    const res = await postRequest(url.forgotPassword, data);
    return res.data;
  }
}

interface ILoginPayload {
  account: string;
  password: string;
}

interface ILoginReturn {
  id: number;
  userId: string;
  token: string;
  status: string;
  createdAt: string;
  updatedAt: string;
}

interface IForgotPasswordPayload {
  email: string;
  verificationCode: string;
  newPassword: string;
}

interface IForgotPasswordReturn {
  email: string;
  id: string;
  phone: string;
  username: string;
}
