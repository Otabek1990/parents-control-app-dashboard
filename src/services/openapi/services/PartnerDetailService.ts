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

const getRoleFromLocalStorage = (): string | null => {
  return localStorage.getItem('role');
};

const isAdmin = (): boolean => {
  const role = getRoleFromLocalStorage();
  return role === 'ADMIN';
};

export class PartnerDetailService {
  public static partnerDetailList(): CancelablePromise<Array<PartnerDetailList>> {
    if (isAdmin()) {
      return __request(OpenAPI, {
        method: 'GET',
        url: '/admin-panel-statistics/admin/partner/',
      });
    } else {
      return Promise.reject(new Error('Unauthorized access')) as CancelablePromise<Array<PartnerDetailList>>;
    }
  }

  
}
