/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
import {  StatisticsAdmin, StatisticsPartner } from '../models/Statistics';

export class StatisticsService {
  /**
   * GET method.
   * @returns any
   * @throws ApiError
   */
  public static statisticsList(): CancelablePromise<StatisticsAdmin> {
    return __request(OpenAPI, {
      method: 'GET',
      url: '/admin-panel-statistics/admin/',
    });
  }
  public static statisticsPartnerList(): CancelablePromise<StatisticsPartner> {
    return __request(OpenAPI, {
      method: 'GET',
      url: '/admin-panel-statistics/partner/',
    });
  }
}
