/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { PartnerCreate } from '../models/PartnerCreate';
import type { PartnerDetail } from '../models/PartnerDetail';
import type { PartnerList } from '../models/PartnerList';
import type { PartnerUpdate } from '../models/PartnerUpdate';

import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class PartnerService {
  /**
   * Partner Create(Post) api view
   * @param data
   * @returns PartnerCreate
   * @throws ApiError
   */
  public static partnerCreateCreate(data: FormData): CancelablePromise<PartnerCreate> {
    return __request(OpenAPI, {
      method: 'POST',
      url: '/admin-panel-partner/create/',
      body: data,
    });
  }



  /**
   * Partner Delete(Delete) API view
   * @param guid
   * @returns void
   * @throws ApiError
   */
  public static partnerDeleteNowDelete(id: string | number): CancelablePromise<void> {
    return __request(OpenAPI, {
      method: 'DELETE',
      url: `/admin-panel-partner/delete/{id}/`,
      path: {
        id: id,
      },
    });
  }

  /**
   * Partner Detail(Detail) API view
   * @param guid
   * @returns PartnerDetail
   * @throws ApiError
   */
  public static partnerDetailNowRead(id: number): CancelablePromise<PartnerDetail> {
    return __request(OpenAPI, {
      method: 'GET',
      url: `/admin-panel-partner/detail/${id}/`,
      //
      path: {
        id: id,
      },
    });
  }

  /**
   * Partner List(List) API view
   * @param search A search term.
   * @param limit Number of results to return per page.
   * @param offset The initial index from which to return the results.
   * @returns any
   * @throws ApiError
   */
  public static partnerListList(
    search?: string,
    limit?: number,
    offset?: number,
  ): CancelablePromise<{
    count: number;
    next?: string | null;
    previous?: string | null;
    results: Array<PartnerList>;
  }> {
    return __request(OpenAPI, {
      method: 'GET',
      url: '/admin-panel-partner/list/',
     
      query: {
        search: search,
        limit: limit,
        offset: offset,
      },
    });
  }

  /**
   * Partner Put(Put) API view
   * @param id
   * @param data
   * @returns PartnerUpdate
   * @throws ApiError
   */
  public static partnerUpdateNowUpdate(id: string | number, data: FormData): CancelablePromise<PartnerUpdate> {
    return __request(OpenAPI, {
      method: 'PUT',
      url: `/admin-panel-partner/update/${id}/`,
      path: {
        id: id,
      },
      body: data,
    });
  }

 
}
