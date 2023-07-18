import axiosInstance from "@/shared/libs/axiosInstance";

export type WorkflowItem = {
  id: string;
  name: string;
  description: string | null;
  createdAt?: string;
  updatedAt?: string;
};

export default class Workflow {
  private readonly baseUrl = "/workflows";

  public async createWorkflows(data: {
    name: string;
    description: string;
  }): Promise<any> {
    const res = await axiosInstance.post(this.baseUrl, data);
    return res.data;
  }

  public async updateWorkflows({ id, ...data }: any) {
    const url = `${this.baseUrl}/${id}`;
    const res = await axiosInstance.patch(url, data);
    return res.data;
  }

  public async getWorkflows(): Promise<WorkflowItem[]> {
    const res = await axiosInstance.get(this.baseUrl);
    return res.data;
  }

  public async deleteWorkflow(id: string): Promise<any> {
    const url = `${this.baseUrl}/${id}`;
    const res = await axiosInstance.delete(url);
    return res.data;
  }
}
