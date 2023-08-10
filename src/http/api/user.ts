import {
  postRequest,
  listRequest,
  getRequest,
  patchRequest,
  deleteRequest,
} from '@/http/methods';
import {Prisma, User, Role} from '@prisma/client';
import url from '@/http/url';

export default class UserApiRequest {
  private readonly url = url.users;

  public async create(
    data: Prisma.UserCreateInput & {roles: Role[]}
  ): Promise<User> {
    const res = await postRequest(this.url, data);
    return res.data;
  }

  public async list(query: {page: number; pageSize: number}): Promise<any> {
    const res = await listRequest(this.url, query);
    return res.data;
  }

  public async get(id: string) {
    const res = await getRequest(this.url, id);
    return res.data;
  }

  public async update(
    id: string,
    data: Prisma.UserUpdateInput & {roles: Role[]}
  ): Promise<User> {
    const res = await patchRequest(this.url, id, data);
    return res.data;
  }

  public async delete(id: string) {
    const res = await deleteRequest(this.url, id);
    return res.data;
  }
}
