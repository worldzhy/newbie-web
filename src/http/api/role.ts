import {
  getRequest,
  listRequest,
  postRequest,
  patchRequest,
  deleteRequest,
} from '@/http/methods';
import {Prisma, Role} from '@prisma/client';
import url from '@/http/url';

export default class RoleApiRequest {
  private readonly url = url.roles;

  public async create(data: Prisma.RoleCreateInput): Promise<Role> {
    const res = await postRequest(this.url, data);
    return res.data;
  }

  public async list(): Promise<Role[]> {
    const res = await listRequest(this.url, {});
    return res.data;
  }

  public async get(id: string): Promise<Role> {
    const res = await getRequest(this.url, id);
    return res.data;
  }

  public async update(id: string, data: Prisma.RoleUpdateInput): Promise<Role> {
    const res = await patchRequest(this.url, id, data);
    return res.data;
  }

  public async delete(roleId: string): Promise<Role> {
    const res = await deleteRequest(this.url, roleId);
    return res.data;
  }
}
