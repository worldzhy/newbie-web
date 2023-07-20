import axiosInstance from "@/shared/libs/axiosInstance";

export default class Role {
  private readonly url = "/roles";

  public async getAll(): Promise<IRole[]> {
    const url = this.url;
    const res = await axiosInstance.get(url);
    return res.data;
  }

  public async get(roleId: string): Promise<IRole> {
    const url = `${this.url}/${roleId}`;
    const res = await axiosInstance.get(url);
    return res.data;
  }

  public async create(name: string): Promise<IRole> {
    const url = this.url;
    const data = { name };
    const res = await axiosInstance.post(url, data);
    return res.data;
  }

  public async update(
    roleId: string,
    payload: IUpdateRolePayload
  ): Promise<IRole> {
    const { name, description } = payload;
    const url = `${this.url}/${roleId}`;
    const data = { name, description };
    const res = await axiosInstance.patch(url, data);
    return res.data;
  }

  public async delete(roleId: string): Promise<IRole> {
    const url = `${this.url}/${roleId}`;
    const res = await axiosInstance.delete(url);
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

interface IUpdateRolePayload {
  name: string;
  description: string;
}
