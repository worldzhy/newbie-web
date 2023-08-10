import {
  postRequest,
  listRequest,
  getRequest,
  patchRequest,
  deleteRequest,
} from '@/http/methods';
import {Prisma, User, Role} from '@prisma/client';
import url from '@/http/url';

export default class UserService {
  public static async create(
    data: Prisma.UserCreateInput & {roles: Role[]}
  ): Promise<User> {
    const res = await postRequest(url.users, data);
    return res.data;
  }

  public static async list(query: {
    page: number;
    pageSize: number;
  }): Promise<any> {
    const res = await listRequest(url.users, query);
    return res.data;
  }

  public static async get(id: string) {
    const res = await getRequest(url.users, id);
    return res.data;
  }

  public static async update(
    id: string,
    data: Prisma.UserUpdateInput & {roles: Role[]}
  ): Promise<User> {
    const res = await patchRequest(url.users, id, data);
    return res.data;
  }

  public static async delete(id: string) {
    const res = await deleteRequest(url.users, id);
    return res.data;
  }
}
