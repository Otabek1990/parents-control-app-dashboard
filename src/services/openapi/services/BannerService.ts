/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
import { BannerCreate } from '../models/BannerCreate';
import { BannerDetail } from '../models/BannerDetail';
import { BannerList } from '../models/BannerList';

export class BannerService {
  /**
   * Banner Create(Post) api view
   * @param data
   * @returns ParentCreate
   * @throws ApiError
   */
  public static bannerCreate(data: FormData): CancelablePromise<BannerCreate> {
    return __request(OpenAPI, {
      method: 'POST',
      url: '/banners/',
      body: data,
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
  }

  /**
   * Banner Delete(Delete) API view
   * @param id
   * @returns ParentList
   * @throws ApiError
   */
  public static bannerDelete(id: number): CancelablePromise<BannerList> {
    return __request(OpenAPI, {
      method: 'DELETE',
      url: `/banner/${id}/`,
      path: {
        id: id,
      },
    });
  }

  /**
   * Banner Detail(Detail) API view
   * @param id
   * @returns ParentDetail
   * @throws ApiError
   */
  public static bannerDetail(id: number): CancelablePromise<BannerDetail> {
    return __request(OpenAPI, {
      method: 'GET',
      url: `/banner/${id}/`,
      path: {
        id: id,
      },
    });
  }

  /**
     * Banner List(List) API view

     * @returns any 
     * @throws ApiError
     */
  public static bannerList(): CancelablePromise<any> {
    return __request(OpenAPI, {
      method: 'GET',
      url: '/banners/',
    });
  }

  /**
   * Banner Child Code Create(Put) api view
   * @param id
   * @param data
   * @returns ParenChildCodeCreate
   * @throws ApiError
   */
  public static bannerUpdate(id: number, data: FormData): CancelablePromise<BannerCreate> {
    return __request(OpenAPI, {
      method: 'PUT',
      url: `/banner/${id}/`,
      path: {
        id: id,
      },
      body: data,
    });
  }
}
