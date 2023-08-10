import {
  deleteRequest,
  getRequest,
  patchRequest,
  postRequest,
} from '@/http/methods';
import {Prisma, WorkflowViewComponent} from '@prisma/client';
import url from '@/http/url';

export default class WorkflowViewComponentService {
  public static async createMany(data: {
    data: Prisma.WorkflowViewComponentCreateManyInput[];
  }) {
    const res = await postRequest(url.workflowViewComponents, data);
    return res.data;
  }

  public static async getViewComponent(
    id: string
  ): Promise<WorkflowViewComponent[]> {
    const res = await getRequest(url.workflowViewComponents, id);
    return res.data;
  }

  public static async update(
    id: string,
    data: Prisma.WorkflowViewComponentUpdateInput
  ) {
    const res = await patchRequest(url.workflowViewComponents, id, data);
    return res.data;
  }

  public static async delete(id: string): Promise<any> {
    const res = await deleteRequest(url.workflowViewComponents, id);
    return res.data;
  }
}
