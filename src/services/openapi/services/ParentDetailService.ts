/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

// admin-panel-parent/list/
export type ParentDetailList = {
  username: string;
  payment_status: string;
  amount: number;
};


export class ParentDetailService {
  public static partnerDetailList(status?: string): CancelablePromise<ParentDetailList> {
    // Fetch the role from localStorage each time before making the request
    const role = localStorage.getItem('role') || 'ADMIN';

    const url = role === 'ADMIN' ? '/admin-panel-statistics/admin/parent/' : '/admin-panel-parent/list/';

    // Pass the `status` parameter if it exists
    return __request(OpenAPI, {
      method: 'GET',
      url: url,
      query: status ? { status } : {}, // Add the status parameter to the query string
    });
  }
}
