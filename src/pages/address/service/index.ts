import { AxiosResponse } from 'axios';
// import { Region } from "services/openapi";
import instance from '@config/axios_config';

export const getRegionList = async ({
  search,
  p,
  offset,
  limit,
}: {
  search?: string;
  p?: boolean;
  offset?: number;
  limit?: number;
}) => {
  try {
    let resp: AxiosResponse<any, any> = await instance.get('/v1/admin-panel-auth/region-list/', {
      // https://production.bosstrackergroup.uz/api/v1/admin-panel-auth/region-list/
      params: {
        search,
        p,
        offset,
        limit,
      },
    });
    return resp.data;
  } catch (e: any) {
    console.log('region list error---> ', e);
  }
};

export const deleteRegion = async (id: string | number) => {
  try {
    let resp: AxiosResponse<any, any> = await instance.delete(`/v1/base-api/admin-panel-auth/region-list/${id}/delete/`);
    return resp.data;
  } catch (e: any) {
    console.log('region list error---> ', e);
  }
};
