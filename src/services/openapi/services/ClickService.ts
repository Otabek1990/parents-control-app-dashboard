/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { PaymeList } from '../models/PaymeList';

import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class ClickService {

  /**
   * Parent Child List(List) API view
   * @returns PaynetList
   * @throws ApiError
   */
  public static ClickGetList(): CancelablePromise<Array<PaymeList>> {
    return __request(OpenAPI, {
      method: 'GET',
      url: '/admin-panel-payment/click/',
    });
  }
}
