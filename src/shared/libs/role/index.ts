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
  public async list(): Promise<Role[]> {
    const res = await listRequest(url.role, {});
    return res.data;
  }

  public async get(id: string): Promise<Role> {
    const res = await getRequest(url.role, id);
    return res.data;
  }

  public async create(params: Prisma.RoleCreateInput): Promise<Role> {
    const res = await postRequest(url.role, params);
    return res.data;
  }

  public async edit(id: string, data: Prisma.RoleUpdateInput): Promise<Role> {
    const res = await patchRequest(url.role, id, data);
    return res.data;
  }

  public async delete(roleId: string): Promise<Role> {
    const res = await deleteRequest(url.role, roleId);
    return res.data;
  }
}
