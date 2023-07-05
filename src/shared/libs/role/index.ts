import axiosInstance from "@/shared/libs/axiosInstance";

export default class Role {
  private readonly baseUrl = "/roles";

  public async get(): Promise<IRole[]> {
    const url = this.baseUrl;
    const res = await axiosInstance.get(url);
    return res.data;
  }

  public async create(name: string): Promise<IRole> {
    const url = this.baseUrl;
    const data = { name };
    const res = await axiosInstance.post(url, data);
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
