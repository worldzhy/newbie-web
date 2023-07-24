import axiosInstance from '@/shared/libs/axiosInstance';
import {type IRole} from '@/shared/libs/role';

export default class User {
  private readonly url = '/users';

  public async get(): Promise<IGetUserOutput> {
    const url = `${this.url}?pageSize=100&page=1&roleId=1&name=1`;
    const res = await axiosInstance.get(url);
    return res.data;
  }

  public async create(payload: IAddUserPayload): Promise<IAddUserResponse> {
    const {email, phone, username, password, roles} = payload;
    const url = this.url;
    const data = {
      email,
      phone,
      username,
      password,
      status: 'ACTIVE',
      roleIds: roles.map(r => ({id: r.id})),
    };
    const res = await axiosInstance.post(url, data);
    return res.data;
  }

  public async update(
    userid: string,
    payload: IUpdateUserPayload
  ): Promise<IUpdateUserResponse> {
    const {email, phone, username, password, roles} = payload;
    const url = `${this.url}/${userid}`;
    const data = {
      email,
      phone,
      username,
      roleIds: roles.map(r => ({id: r.id})),
      ...(password !== '' && {password}),
    };
    const res = await axiosInstance.patch(url, data);
    return res.data;
  }

  public async delete(userid: string): Promise<IDeleteUserResponse> {
    const url = `${this.url}/${userid}`;
    const res = await axiosInstance.delete(url);
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
  roles: IRole[];
  createdAt: string;
  updatedAt: string;
}

interface IGetUserOutput {
  records: Array<
    IUser & {
      status: string;
      lastLoginAt: string;
      organizationId: null | string;
      profiles: [];
      locations: [];
    }
  >;
  pagination: {
    page: number;
    pageSize: number;
    currentNumberOfRecords: number;
    totalNumberOfRecords: number;
  };
}

interface IAddUserPayload {
  email: string;
  phone: string;
  username: string;
  password: string;
  roles: IRole[];
}

interface IAddUserResponse {
  id: string;
  email: string;
  phone: string;
  username: string;
  status: string;
  profiles: [];
}

interface IUpdateUserPayload {
  email: string;
  phone: string;
  username: string;
  password: string;
  roles: IRole[];
}

interface IUpdateUserResponse {
  id: string;
  email: string;
  phone: string;
  username: string;
  password: string;
  status: string;
  lastLoginAt: string | null;
  createdAt: string;
  updatedAt: string;
  organizationId: string | null;
}

interface IDeleteUserResponse extends IUpdateUserResponse {}
