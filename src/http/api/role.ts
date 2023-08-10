import {
  getRequest,
  listRequest,
  postRequest,
  patchRequest,
  deleteRequest,
} from '@/http/methods';
import {Prisma, Role} from '@prisma/client';
import url from '@/http/url';

export default class RoleService {
  public static async create(data: Prisma.RoleCreateInput): Promise<Role> {
    const res = await postRequest(url.roles, data);
    return res.data;
  }

  public static async list(): Promise<Role[]> {
    const res = await listRequest(url.roles, {});
    return res.data;
  }

  public static async get(id: string): Promise<Role> {
    const res = await getRequest(url.roles, id);
    return res.data;
  }

  public static async update(
    id: string,
    data: Prisma.RoleUpdateInput
  ): Promise<Role> {
    const res = await patchRequest(url.roles, id, data);
    return res.data;
  }

  public static async delete(roleId: string): Promise<Role> {
    const res = await deleteRequest(url.roles, roleId);
    return res.data;
  }
}
