/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
import { MonthlyPercentageData  } from '../models/MonthlyPercentageCreate';


export class MonthlyPercentageService {
  public static monthlyPercentageCreate(data: MonthlyPercentageData[]): CancelablePromise<MonthlyPercentageData[]> {
    return __request(OpenAPI, {
      method: 'POST',
      url: '/admin-panel-partner/monthly-percentages/',
      body: data,
    });
  }
}
