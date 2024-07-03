/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */


import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export type PartnerDetailList = {
  username: string;
  parent_count: string;
  total_profit: number;
};

export class PartnerDetailService {
  public static partnerDetailList(): CancelablePromise<Array<PartnerDetailList>> {
    return __request(OpenAPI, {
      method: 'GET',
      url: '/admin-panel-statistics/admin/partner/',
    });
  }
}
