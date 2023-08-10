import {Prisma, WorkflowState} from '@prisma/client';
import {
  deleteRequest,
  getRequest,
  patchRequest,
  postRequest,
} from '@/http/methods';
import url from '@/http/url';

export default class WorkflowStateApiRequest {
  private readonly url = url.workflowStates;

  public async create(
    data: Prisma.WorkflowStateUncheckedCreateInput
  ): Promise<WorkflowState> {
    const res = await postRequest(this.url, data);
    return res.data;
  }

  public async getState(id: string): Promise<WorkflowState[]> {
    const {data} = await getRequest(this.url, id);
    return Array.isArray(data) ? data : [];
  }

  public async update(
    id: string,
    data: Prisma.WorkflowStateUncheckedUpdateInput
  ) {
    const res = await patchRequest(this.url, id, data);
    return res.data;
  }

  public async delete(id: string): Promise<WorkflowState> {
    const res = await deleteRequest(this.url, id);
    return res.data;
  }
}
