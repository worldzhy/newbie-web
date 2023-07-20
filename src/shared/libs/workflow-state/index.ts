import axiosInstance from "@/shared/libs/axiosInstance";

export type StateItem = {
  id: string;
  workflowId: string;
  name: string;
  description: string | null;
  createdAt?: string;
  updatedAt?: string;
};

export default class WorkflowState {
  private readonly url = "/workflow-states";

  public async createState(data: {
    workflowId: string;
    name: string;
    description: string;
  }): Promise<any> {
    const res = await axiosInstance.post(this.url, data);
    return res.data;
  }

  public async updateState({ id, ...data }: any) {
    const url = `${this.url}/${id}`;
    const res = await axiosInstance.patch(url, data);
    return res.data;
  }

  public async getState(id: string): Promise<StateItem[]> {
    const url = `${this.url}/${id}`;
    const { data } = await axiosInstance.get(url);
    return Array.isArray(data) ? data : [];
  }

  public async deleteState(id: string): Promise<any> {
    const url = `${this.url}/${id}`;
    const res = await axiosInstance.delete(url);
    return res.data;
  }
}
