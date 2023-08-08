import axiosInstance from '@/shared/libs/axiosInstance';

export type RouteItem = {
  id: number;
  viewId: number;
  stateId: number;
  workflowId: string;
  nextViewId: number;
  nextRoleId: number;
  nextUserId: number;
  startSign: boolean;
  updatedAt?: string;
  createdAt?: string;
};

export default class WorkflowRoute {
  private readonly url = '/workflow-routes';

  public async createRoute(data: {
    workflowId: string;
    viewId: number;
    stateId: number;
    nextViewId: number;
    startSign?: boolean;
  }): Promise<RouteItem> {
    const res = await axiosInstance.post(this.url, data);
    return res.data;
  }

  public async updateRoute({id, ...data}: any) {
    const url = `${this.url}/${id}`;
    const res = await axiosInstance.patch(url, data);
    return res.data;
  }

  public async getRoute(id: string): Promise<RouteItem[]> {
    const url = `${this.url}?workflowId=${id}`;
    const {data} = await axiosInstance.get(url);
    return Array.isArray(data) ? data : [];
  }

  public async deleteRoute(id: string): Promise<any> {
    const url = `${this.url}/${id}`;
    const res = await axiosInstance.delete(url);
    return res.data;
  }
}
