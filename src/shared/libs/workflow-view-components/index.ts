import axiosInstance from '@/shared/libs/axiosInstance';

export type ViewComponent = {
  viewId: number;
  type: string;
  subType: string;
  properties: any;
  createdAt?: string;
  updatedAt?: string;
};

export default class WorkflowViewComponent {
  private readonly url = '/workflow-view-components';

  public async createViewComponent(data: {
    viewId: number;
    type: string;
    subType: string;
    properties: any;
  }): Promise<ViewComponent> {
    const res = await axiosInstance.post(this.url, data);
    return res.data;
  }

  public async updateViewComponent({id, ...data}: any) {
    const url = `${this.url}/${id}`;
    const res = await axiosInstance.patch(url, data);
    return res.data;
  }

  public async getViewComponent(id: string): Promise<ViewComponent[]> {
    const url = `${this.url}/${id}`;
    const res = await axiosInstance.get(url);
    return res.data;
  }

  public async deleteViewComponent(id: string): Promise<any> {
    const url = `${this.url}/${id}`;
    const res = await axiosInstance.delete(url);
    return res.data;
  }
}
