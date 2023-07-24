import axiosInstance from '@/shared/libs/axiosInstance';

export type WorkflowItem = {
  id: string;
  name: string;
  description: string | null;
  createdAt?: string;
  updatedAt?: string;
};

export default class Workflow {
  private readonly url = '/workflows';

  public async createWorkflows(data: {
    name: string;
    description: string;
  }): Promise<any> {
    const res = await axiosInstance.post(this.url, data);
    return res.data;
  }

  public async updateWorkflow({id, ...data}: any) {
    const url = `${this.url}/${id}`;
    const res = await axiosInstance.patch(url, data);
    return res.data;
  }

  public async getWorkflows(): Promise<WorkflowItem[]> {
    const res = await axiosInstance.get(this.url);
    return res.data;
  }

  public async getWorkflowData(id: string): Promise<any> {
    const url = `${this.url}/${id}`;
    const res = await axiosInstance.get(url);
    return res.data;
  }

  public async deleteWorkflow(id: string): Promise<any> {
    const url = `${this.url}/${id}`;
    const res = await axiosInstance.delete(url);
    return res.data;
  }
}
