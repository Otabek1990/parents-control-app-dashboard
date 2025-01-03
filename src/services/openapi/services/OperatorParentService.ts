/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import { ACCESS_TOKEN } from '@config/constants';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

// For non-ADMIN role
export type OperatorParentsList = {
  abonent_code: string;
  id: number;
  last_login: string;
  tariff_expiry_time: string | null;
  tariff_name: string | null;
  username: string;
  created_at?:string;
  is_called:boolean;
  operator:string | null;
  operator_status:string;
  status:{
    status:string;
    amount:number
  }
};

export class OperatorParentsService {
  public static operatorParentsList(
    q?: string,
    limit?: number,
    offset?: number,
    startDate?: string,
    endDate?: string,
  ): CancelablePromise<{
    count: number;
    next?: string | null;
    previous?: string | null;
    results: Array<OperatorParentsList>;
  }> {
    const url = '/admin-panel-operator/parent/list/';
    const token = localStorage.getItem(ACCESS_TOKEN);

    if (!token) {
      throw new Error('Authorization token is missing');
    }

    return __request(OpenAPI, {
      method: 'GET',
      url: url,
      headers: {
        Authorization: `Bearer ${token}`, // Include the token in the headers
      },
      query: {
        q: q,
        limit: limit,
        offset: offset,
        start_date: startDate,
        end_date: endDate,
      },
    });
  }
  public static ParentsCallStatusList(
    // q?: string,
    // limit?: number,
    // offset?: number,
    // startDate?: string,
    // endDate?: string,
    is_called?:string
  ): CancelablePromise<{
    count: number;
    next?: string | null;
    previous?: string | null;
    results: Array<OperatorParentsList>;
  }> {
    const url = '/admin-panel-operator/called-parent/list/';
    const token = localStorage.getItem(ACCESS_TOKEN);

    if (!token) {
      throw new Error('Authorization token is missing');
    }

    return __request(OpenAPI, {
      method: 'GET',
      url: url,
      headers: {
        Authorization: `Bearer ${token}`, // Include the token in the headers
      },
      query: {
        // q: q,
        // limit: limit,
        // offset: offset,
        // start_date: startDate,
        // end_date: endDate,
        is_called:is_called
      },
    });
  }
}
