/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
import { StatisticsAdmin, StatisticsPartner } from '../models/Statistics';

const getRoleFromLocalStorage = (): string | null => {
  return localStorage.getItem('role');
};

const isAdmin = (): boolean => {
  const role = getRoleFromLocalStorage();
  return role === 'ADMIN';
};

export class StatisticsService {
  /**
   * GET method.
   * @returns any
   * @throws ApiError
   */
  public static statisticsList(): CancelablePromise<StatisticsAdmin> {
    if (isAdmin()) {
      return __request(OpenAPI, {
        method: 'GET',
        url: '/admin-panel-statistics/admin/',
      });
    } else {
      return Promise.reject(new Error('Unauthorized access')) as CancelablePromise<StatisticsAdmin>;
    }
  }

  public static statisticsPartnerList(): CancelablePromise<StatisticsPartner> {
    return __request(OpenAPI, {
      method: 'GET',
      url: '/admin-panel-statistics/partner/',
    });
  }
}
