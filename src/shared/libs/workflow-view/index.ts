import axiosInstance from '@/shared/libs/axiosInstance';

export type ViewItem = {
  id: number;
  workflowId: string;
  name: string;
  components: any[];
  startSign?: boolean;
  description: string | null;
  createdAt?: string;
  updatedAt?: string;
};

export default class WorkflowView {
  private readonly url = '/workflow-views';

  public async createView(data: {
    workflowId: string;
    name: string;
    description: string;
  }): Promise<ViewItem> {
    const res = await axiosInstance.post(this.url, data);
    return res.data;
  }

  public async updateView({id, ...data}: any) {
    const url = `${this.url}/${id}`;
    const res = await axiosInstance.patch(url, data);
    return res.data;
  }

  public async getView(id: string): Promise<ViewItem> {
    const url = `${this.url}/${id}`;
    const res = await axiosInstance.get(url);
    return res.data;
  }

  public async deleteView(id: string): Promise<any> {
    const url = `${this.url}/${id}`;
    const res = await axiosInstance.delete(url);
    return res.data;
  }
}
