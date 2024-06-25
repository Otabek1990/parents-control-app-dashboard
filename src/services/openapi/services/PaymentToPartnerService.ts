/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
// import type { ParenChildCodeCreate } from '../models/ParenChildCodeCreate';
// import type { ParentCheckSms } from '../models/ParentCheckSms';
// import type { ParentCreate } from '../models/ParentCreate';
// import type { ParentDetail } from '../models/ParentDetail';
// import type { ParentList } from '../models/ParentList';
// import type { ParentLogin } from '../models/ParentLogin';
// import type { ParentProfileList } from '../models/ParentProfileList';
// import type { ParentProfileUpdate } from '../models/ParentProfileUpdate';
// import type { ParentSignUp } from '../models/ParentSignUp';
// import type { ParentUpdate } from '../models/ParentUpdate';

import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
import { PaymentToPartnerList } from '../models/PaymentToPartnerList';

export class PaymentToPartnerService {

    /**
     * Parent Create(Post) api view
     * @param data 
     * @returns ParentCreate 
     * @throws ApiError
     */
//     public static parentCreateCreate(
// data: ParentCreate,
// ): CancelablePromise<ParentCreate> {
//         return __request(OpenAPI, {
//             method: 'POST',
//             url: '/parent/create/',
//             body: data,
//         });
//     }

    /**
     * Parent Delete(Delete) API view
     * @param guid 
     * @returns ParentList 
     * @throws ApiError
     */
//     public static parentDeleteNowRead(
// guid: string,
// ): CancelablePromise<ParentList> {
//         return __request(OpenAPI, {
//             method: 'GET',
//             url: '/parent/delete/{guid}/now/',
//             path: {
//                 'guid': guid,
//             },
//         });
//     }



    /**
     * Parent Detail(Detail) API view
     * @param guid 
     * @returns ParentDetail 
     * @throws ApiError
     */
//     public static parentDetailNowRead(
// guid: string | number,
// ): CancelablePromise<ParentDetail> {
//         return __request(OpenAPI, {
//             method: 'GET',
//             url: '/admin-panel-parent/detail/{guid}/',
//             path: {
//                 'guid': guid,
//             },
//         });
//     }

    /**
     * Parent List(List) API view

     * @returns any 
     * @throws ApiError
     */
    public static paymentToPartnerGetList(): CancelablePromise<{
count: number;
next?: string | null;
previous?: string | null;
results: Array<PaymentToPartnerList>;
}> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/admin-panel-payment/to-partners/',
           
        });
    }


    /**
     * Parent Child Code Create(Put) api view
     * @param guid 
     * @param data 
     * @returns ParenChildCodeCreate 
     * @throws ApiError
     */
//     public static parentParentChildAddUpdate(
// guid: string,
// data: ParenChildCodeCreate,
// ): CancelablePromise<ParenChildCodeCreate> {
//         return __request(OpenAPI, {
//             method: 'PUT',
//             url: '/parent/parent/{guid}/child-add/',
//             path: {
//                 'guid': guid,
//             },
//             body: data,
//         });
//     }

   
}
