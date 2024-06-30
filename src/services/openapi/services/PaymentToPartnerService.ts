/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */


import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
import { PaymentToPartnerCreate } from '../models/PaymentToPartnerCreate';
import { PaymentToPartnerDetail } from '../models/PaymentToPartnerDetail';
import { PaymentToPartnerList } from '../models/PaymentToPartnerList';

export class PaymentToPartnerService {
  /**
   * Parent Create(Post) api view
   * @param data
   * @returns ParentCreate
   * @throws ApiError
   */
  public static paymentToPartnerCreate(data: PaymentToPartnerCreate): CancelablePromise<PaymentToPartnerCreate> {
    return __request(OpenAPI, {
      method: 'POST',
      url: '/admin-panel-payment/to-partners/',
      body: data,
    });
  }

  /**
   * Parent Delete(Delete) API view
   * @param id
   * @returns ParentList
   * @throws ApiError
   */
  public static paymentToPartnerDelete(id: number): CancelablePromise<PaymentToPartnerList> {
    return __request(OpenAPI, {
      method: 'DELETE',
      url: `/admin-panel-payment/to-partner/${id}/`,
      path: {
        id: id,
      },
    });
  }

  /**
   * Parent Detail(Detail) API view
   * @param id
   * @returns ParentDetail
   * @throws ApiError
   */
      public static paymentToPartnerDetail(
  id: number,
  ): CancelablePromise<PaymentToPartnerDetail> {
          return __request(OpenAPI, {
              method: 'GET',
              url: `/admin-panel-payment/to-partner/${id}/`,
        
              path: {
                  'id': id,
              },
          });
      }

  /**
     * Parent List(List) API view

     * @returns any 
     * @throws ApiError
     */
  public static paymentToPartnerGetList(): CancelablePromise<Array<PaymentToPartnerList>> {
    return __request(OpenAPI, {
      method: 'GET',
      url: '/admin-panel-payment/to-partners/',
    });
  }

  /**
   * Parent Child Code Create(Put) api view
   * @param id
   * @param data
   * @returns ParenChildCodeCreate
   * @throws ApiError
   */
      public static paymentToPartnerUpdate(
  id: number,
  data: PaymentToPartnerCreate,
  ): CancelablePromise<PaymentToPartnerCreate> {
          return __request(OpenAPI, {
              method: 'PUT',
              url: `/admin-panel-payment/to-partner/${id}/`,
              path: {
                  'id': id,
              },
              body: data,
          });
      }
}
