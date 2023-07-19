import axiosInstance from "@/shared/libs/axiosInstance";

export type ViewItem = {
  id: string;
  workflowId: string;
  name: string;
  startSign?: boolean;
  description: string | null;
  createdAt?: string;
  updatedAt?: string;
};

export default class WorkflowView {
  private readonly baseUrl = "/workflow-views";

  public async createView(data: {
    workflowId: string;
    name: string;
    description: string;
  }): Promise<any> {
    const res = await axiosInstance.post(this.baseUrl, data);
    return res.data;
  }

  public async updateView({ id, ...data }: any) {
    const url = `${this.baseUrl}/${id}`;
    const res = await axiosInstance.patch(url, data);
    return res.data;
  }

  public async getView(id: string): Promise<ViewItem[]> {
    const url = `${this.baseUrl}/${id}`;
    const { data } = await axiosInstance.get(url);
    return Array.isArray(data) ? data : [];
  }

  public async deleteView(id: string): Promise<any> {
    const url = `${this.baseUrl}/${id}`;
    const res = await axiosInstance.delete(url);
    return res.data;
  }
}
