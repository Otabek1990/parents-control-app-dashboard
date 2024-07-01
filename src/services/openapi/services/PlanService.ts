/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

import { PlanCreate } from '../models/PlanCreate';
import { PlanList } from '../models/PlanList';

export class PlanService {
  /**
     * Banner List(List) API view

     * @returns any 
     * @throws ApiError
     */
  public static planList(): CancelablePromise<Array<PlanList>> {
    return __request(OpenAPI, {
      method: 'GET',
      url: '/admin-panel-statistics/client-adding-plans/',
    });
  }
  /**
   * Banner Create(Post) api view
   * @param data
   * @returns ParentCreate
   * @throws ApiError
   */
  public static planCreate(data: PlanCreate): CancelablePromise<PlanCreate> {
    return __request(OpenAPI, {
      method: 'POST',
      url: '/admin-panel-statistics/client-adding-plans/',
      body: data,
    });
  }

  /**
   * Banner Delete(Delete) API view
   * @param id
   * @returns ParentList
   * @throws ApiError
   */
  //   public static bannerDelete(id: number): CancelablePromise<BannerList> {
  //     return __request(OpenAPI, {
  //       method: 'DELETE',
  //       url: `/banner/${id}/`,
  //       path: {
  //         id: id,
  //       },
  //     });
  //   }

  /**
//    * Banner Detail(Detail) API view
//    * @param id
//    * @returns ParentDetail
//    * @throws ApiError
//    */
  //   public static bannerDetail(id: number): CancelablePromise<BannerDetail> {
  //     return __request(OpenAPI, {
  //       method: 'GET',
  //       url: `/banner/${id}/`,
  //       path: {
  //         id: id,
  //       },
  //     });
  //   }

  //   /**
  //    * Banner Child Code Create(Put) api view
  //    * @param id
  //    * @param data
  //    * @returns ParenChildCodeCreate
  //    * @throws ApiError
  //    */
  //   public static bannerUpdate(id: number, data: BannerCreate): CancelablePromise<BannerCreate> {
  //     return __request(OpenAPI, {
  //       method: 'PUT',
  //       url: `/banner/${id}/`,
  //       path: {
  //         id: id,
  //       },
  //       body: data,
  //     });
  //   }
}
