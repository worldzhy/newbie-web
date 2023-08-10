import {Prisma, Workflow, WorkflowState, WorkflowView} from '@prisma/client';
import {
  deleteRequest,
  getRequest,
  listRequest,
  patchRequest,
  postRequest,
} from '@/http/methods';
import url from '@/http/url';

export default class WorkflowApiRequest {
  private readonly url = url.workflows;

  public async create(data: Prisma.WorkflowCreateInput): Promise<Workflow> {
    const res = await postRequest(this.url, data);
    return res.data;
  }

  public async list(): Promise<Workflow[]> {
    const res = await listRequest(this.url, {});
    return res.data;
  }

  public async get(
    id: string
  ): Promise<Workflow & {views: WorkflowView[]; states: WorkflowState[]}> {
    const res = await getRequest(this.url, id);
    return res.data;
  }

  public async update(id: string, data: Prisma.WorkflowUpdateInput) {
    const res = await patchRequest(this.url, id, data);
    return res.data;
  }

  public async delete(id: string): Promise<Workflow> {
    const res = await deleteRequest(this.url, id);
    return res.data;
  }
}
