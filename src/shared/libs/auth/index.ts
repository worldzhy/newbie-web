import axiosInstance from "@/shared/libs/axiosInstance";
import { setCookie } from "cookies-next";

export default class Auth {
  private readonly baseUrl = "/account";

  public async login(input: ILoginPayload): Promise<ILoginReturn> {
    const url = `${this.baseUrl}/login/password`;
    const data = {
      account: input.account,
      password: input.password,
    };
    const res = await axiosInstance.post(url, data);
    setCookie("token", res.data.token);
    return res.data;
  }

  public async sendVerificationCode(email: string): Promise<boolean> {
    const url = `${this.baseUrl}/reset-password/verification-code/email/${email}`;
    const res = await axiosInstance.get(url);
    return res.data;
  }

  public async forgotPassword(
    payload: IForgotPasswordPayload
  ): Promise<IForgotPasswordReturn> {
    const { email, verificationCode, newPassword } = payload;
    const url = `${this.baseUrl}/reset-password`;
    const data = {
      email,
      verificationCode,
      newPassword,
    };
    const res = await axiosInstance.patch(url, data);
    return res.data;
  }
}

/**
 * Types
 */

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
