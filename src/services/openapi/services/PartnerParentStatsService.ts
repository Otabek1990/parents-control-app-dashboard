/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import { ACCESS_TOKEN } from '@config/constants';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

// For non-ADMIN role
export type PartnerParentStatsList = {
  count: number;
  next: string | null;
  previous: string | null;
  results: Array<{
    abonent_code: string;
    id: number;
    last_login: string;
    status: string;
    tariff_expiry_time: string | null;
    tariff_name: string | null;
    username: string;
  }>;
};


export class PartnerParentStatsService {
  public static partnerParentDetailList(status?: string): CancelablePromise<PartnerParentStatsList> {
    const url = '/admin-panel-parent/list/' 
    const token=localStorage.getItem(ACCESS_TOKEN)
    return __request(OpenAPI, {
      method: 'GET',
      url: url,
      headers: {
        Authorization: `Bearer ${token}`, // Include the token in the headers
      },
      query: status ? { status } : {}, // Add the status parameter to the query string
    });
  }
}

