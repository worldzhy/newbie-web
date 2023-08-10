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

export default class WorkflowRouteService {
  public static async create(
    data: Prisma.WorkflowRouteUncheckedCreateInput
  ): Promise<WorkflowRoute> {
    const res = await postRequest(url.workflowRoutes, data);
    return res.data;
  }

  public static async list(query: {workflowId: string}): Promise<
    (WorkflowRoute & {
      view: WorkflowView;
      state: WorkflowState;
      nextView: WorkflowView;
    })[]
  > {
    const res = await listRequest(url.workflowRoutes, query);
    return res.data;
  }

  public static async update(
    id: string,
    data: Prisma.WorkflowRouteUpdateInput
  ) {
    const res = await patchRequest(url.workflowRoutes, id, data);
    return res.data;
  }

  public static async delete(id: string): Promise<WorkflowRoute> {
    const res = await deleteRequest(url.workflowRoutes, id);
    return res.data;
  }
}
