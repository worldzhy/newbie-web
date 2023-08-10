import {
  Prisma,
  WorkflowRoute,
  WorkflowState,
  WorkflowView,
} from '@prisma/client';
import {
  listRequest,
  postRequest,
  patchRequest,
  deleteRequest,
} from '@/http/methods';
import url from '@/http/url';

export default class WorkflowRouteApiRequest {
  private readonly url = url.workflowRoutes;

  public async create(
    data: Prisma.WorkflowRouteUncheckedCreateInput
  ): Promise<WorkflowRoute> {
    const res = await postRequest(this.url, data);
    return res.data;
  }

  public async list(query: {workflowId: string}): Promise<
    (WorkflowRoute & {
      view: WorkflowView;
      state: WorkflowState;
      nextView: WorkflowView;
    })[]
  > {
    const res = await listRequest(this.url, query);
    return res.data;
  }

  public async update(id: string, data: Prisma.WorkflowRouteUpdateInput) {
    const res = await patchRequest(this.url, id, data);
    return res.data;
  }

  public async delete(id: string): Promise<WorkflowRoute> {
    const res = await deleteRequest(this.url, id);
    return res.data;
  }
}
