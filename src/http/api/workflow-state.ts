import {Prisma, WorkflowState} from '@prisma/client';
import {
  deleteRequest,
  getRequest,
  patchRequest,
  postRequest,
} from '@/http/methods';
import url from '@/http/url';

export default class WorkflowStateApiRequest {
  public async create(
    data: Prisma.WorkflowStateUncheckedCreateInput
  ): Promise<WorkflowState> {
    const res = await postRequest(url.workflowStates, data);
    return res.data;
  }

  public async getState(id: string): Promise<WorkflowState[]> {
    const {data} = await getRequest(url.workflowStates, id);
    return Array.isArray(data) ? data : [];
  }

  public async update(
    id: string,
    data: Prisma.WorkflowStateUncheckedUpdateInput
  ) {
    const res = await patchRequest(url.workflowStates, id, data);
    return res.data;
  }

  public async delete(id: string): Promise<WorkflowState> {
    const res = await deleteRequest(url.workflowStates, id);
    return res.data;
  }
}
