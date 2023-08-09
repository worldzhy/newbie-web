import {
  deleteRequest,
  getRequest,
  listRequest,
  patchRequest,
  postRequest,
} from '@/shared/libs/axiosInstance';
import {Prisma, Role} from '@prisma/client';
import url from '../axiosInstance/url';

export default class RoleApiRequest {
  public async create(data: Prisma.RoleCreateInput): Promise<Role> {
    const res = await postRequest(url.roles, data);
    return res.data;
  }

  public async list(): Promise<Role[]> {
    const res = await listRequest(url.roles, {});
    return res.data;
  }

  public async get(id: string): Promise<Role> {
    const res = await getRequest(url.roles, id);
    return res.data;
  }

  public async update(id: string, data: Prisma.RoleUpdateInput): Promise<Role> {
    const res = await patchRequest(url.roles, id, data);
    return res.data;
  }

  public async delete(roleId: string): Promise<Role> {
    const res = await deleteRequest(url.roles, roleId);
    return res.data;
  }
}
