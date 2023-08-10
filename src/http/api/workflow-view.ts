import {
  Prisma,
  WorkflowRoute,
  WorkflowView,
  WorkflowViewComponent,
} from '@prisma/client';
import {
  deleteRequest,
  getRequest,
  listRequest,
  patchRequest,
  postRequest,
} from '@/http/methods';
import url from '@/http/url';

export default class WorkflowViewApiRequest {
  private readonly url = url.workflowViews;

  public async create(
    data: Prisma.WorkflowViewUncheckedCreateInput
  ): Promise<WorkflowView> {
    const res = await postRequest(this.url, data);
    return res.data;
  }

  public async get(id: string): Promise<
    WorkflowView & {
      components: WorkflowViewComponent[];
      outboundRoutes: WorkflowRoute[];
      inboundRoutes: WorkflowRoute[];
    }
  > {
    const res = await getRequest(this.url, id);
    return res.data;
  }

  public async getStartViews(workflowId: string): Promise<any> {
    const res = await listRequest(this.url, {workflowId});
    return res.data;
  }

  public async update(
    id: string,
    data: Prisma.WorkflowViewUncheckedUpdateInput
  ) {
    const res = await patchRequest(this.url, id, data);
    return res.data;
  }

  public async delete(id: string): Promise<WorkflowView> {
    const res = await deleteRequest(this.url, id);
    return res.data;
  }
}
