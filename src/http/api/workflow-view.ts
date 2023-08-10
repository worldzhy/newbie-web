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

export default class WorkflowViewService {
  public static async create(
    data: Prisma.WorkflowViewUncheckedCreateInput
  ): Promise<WorkflowView> {
    const res = await postRequest(url.workflowViews, data);
    return res.data;
  }

  public static async get(id: string): Promise<
    WorkflowView & {
      components: WorkflowViewComponent[];
      outboundRoutes: WorkflowRoute[];
      inboundRoutes: WorkflowRoute[];
    }
  > {
    const res = await getRequest(url.workflowViews, id);
    return res.data;
  }

  public static async getStartViews(workflowId: string): Promise<any> {
    const res = await listRequest(url.workflowViews, {workflowId});
    return res.data;
  }

  public static async update(
    id: string,
    data: Prisma.WorkflowViewUncheckedUpdateInput
  ) {
    const res = await patchRequest(url.workflowViews, id, data);
    return res.data;
  }

  public static async delete(id: string): Promise<WorkflowView> {
    const res = await deleteRequest(url.workflowViews, id);
    return res.data;
  }
}
