import {Prisma, Workflow, WorkflowState, WorkflowView} from '@prisma/client';
import {
  deleteRequest,
  getRequest,
  listRequest,
  patchRequest,
  postRequest,
} from '@/http/methods';
import url from '@/http/url';

export default class WorkflowService {
  public static async create(
    data: Prisma.WorkflowCreateInput
  ): Promise<Workflow> {
    const res = await postRequest(url.workflows, data);
    return res.data;
  }

  public static async list(): Promise<Workflow[]> {
    const res = await listRequest(url.workflows, {});
    return res.data;
  }

  public static async get(
    id: string
  ): Promise<Workflow & {views: WorkflowView[]; states: WorkflowState[]}> {
    const res = await getRequest(url.workflows, id);
    return res.data;
  }

  public static async update(id: string, data: Prisma.WorkflowUpdateInput) {
    const res = await patchRequest(url.workflows, id, data);
    return res.data;
  }

  public static async delete(id: string): Promise<Workflow> {
    const res = await deleteRequest(url.workflows, id);
    return res.data;
  }
}
