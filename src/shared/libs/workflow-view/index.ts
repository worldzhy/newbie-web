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
} from '../axiosInstance';
import url from '../axiosInstance/url';

export default class WorkflowViewApiRequest {
  public async create(
    data: Prisma.WorkflowViewUncheckedCreateInput
  ): Promise<WorkflowView> {
    const res = await postRequest(url.workflowViews, data);
    return res.data;
  }

  public async get(id: string): Promise<
    WorkflowView & {
      components: WorkflowViewComponent[];
      outboundRoutes: WorkflowRoute[];
      inboundRoutes: WorkflowRoute[];
    }
  > {
    const res = await getRequest(url.workflowViews, id);
    return res.data;
  }

  public async getStartViews(workflowId: string): Promise<any> {
    const res = await listRequest(url.workflowStartViews, {workflowId});
    return res.data;
  }

  public async update(
    id: string,
    data: Prisma.WorkflowViewUncheckedUpdateInput
  ) {
    const res = await patchRequest(url.workflowViews, id, data);
    return res.data;
  }

  public async delete(id: string): Promise<WorkflowView> {
    const res = await deleteRequest(url.workflowViews, id);
    return res.data;
  }
}
