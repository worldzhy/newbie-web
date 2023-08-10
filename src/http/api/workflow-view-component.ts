import {
  deleteRequest,
  getRequest,
  patchRequest,
  postRequest,
} from '@/http/methods';
import {Prisma, WorkflowViewComponent} from '@prisma/client';
import url from '@/http/url';

export default class WorkflowViewComponentApiRequest {
  private readonly url = url.workflowViewComponents;

  public async createMany(data: {
    data: Prisma.WorkflowViewComponentCreateManyInput[];
  }) {
    const res = await postRequest(this.url, data);
    return res.data;
  }

  public async getViewComponent(id: string): Promise<WorkflowViewComponent[]> {
    const res = await getRequest(this.url, id);
    return res.data;
  }

  public async update(
    id: string,
    data: Prisma.WorkflowViewComponentUpdateInput
  ) {
    const res = await patchRequest(this.url, id, data);
    return res.data;
  }

  public async delete(id: string): Promise<any> {
    const res = await deleteRequest(this.url, id);
    return res.data;
  }
}
