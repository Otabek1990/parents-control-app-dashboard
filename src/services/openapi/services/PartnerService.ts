/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { PartnerCreate } from '../models/PartnerCreate';
import type { PartnerDetail } from '../models/PartnerDetail';
import type { PartnerList } from '../models/PartnerList';
import type { PartnerUpdate } from '../models/PartnerUpdate';

import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class PartnerService {

    /**
     * Partner Create(Post) api view
     * @param data 
     * @returns PartnerCreate 
     * @throws ApiError
     */
    public static partnerCreateCreate(
data: PartnerCreate,
): CancelablePromise<PartnerCreate> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/partner/create/',
            body: data,
        });
    }

    /**
     * Partner Delete(Delete) API view
     * @param guid 
     * @returns PartnerList 
     * @throws ApiError
     */
    public static partnerDeleteNowRead(
guid: string,
): CancelablePromise<PartnerList> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/partner/delete/{guid}/now/',
            path: {
                'guid': guid,
            },
        });
    }

    /**
     * Partner Delete(Delete) API view
     * @param guid 
     * @returns void 
     * @throws ApiError
     */
    public static partnerDeleteNowDelete(
guid: string,
): CancelablePromise<void> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/partner/delete/{guid}/now/',
            path: {
                'guid': guid,
            },
        });
    }

    /**
     * Partner Detail(Detail) API view
     * @param guid 
     * @returns PartnerDetail 
     * @throws ApiError
     */
    public static partnerDetailNowRead(
guid: string,
): CancelablePromise<PartnerDetail> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/partner/detail/{guid}/now/',
            path: {
                'guid': guid,
            },
        });
    }

    /**
     * Partner List(List) API view
     * @param search A search term.
     * @param limit Number of results to return per page.
     * @param offset The initial index from which to return the results.
     * @returns any 
     * @throws ApiError
     */
    public static partnerListList(
search?: string,
limit?: number,
offset?: number,
): CancelablePromise<{
count: number;
next?: string | null;
previous?: string | null;
results: Array<PartnerList>;
}> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/partner/list/',
            query: {
                'search': search,
                'limit': limit,
                'offset': offset,
            },
        });
    }

    /**
     * Partner Put(Put) API view
     * @param guid 
     * @returns PartnerUpdate 
     * @throws ApiError
     */
    public static partnerUpdateNowRead(
guid: string,
): CancelablePromise<PartnerUpdate> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/partner/update/{guid}/now/',
            path: {
                'guid': guid,
            },
        });
    }

    /**
     * Partner Put(Put) API view
     * @param guid 
     * @param data 
     * @returns PartnerUpdate 
     * @throws ApiError
     */
    public static partnerUpdateNowUpdate(
guid: string,
data: PartnerUpdate,
): CancelablePromise<PartnerUpdate> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/partner/update/{guid}/now/',
            path: {
                'guid': guid,
            },
            body: data,
        });
    }

    /**
     * Partner Put(Put) API view
     * @param guid 
     * @param data 
     * @returns PartnerUpdate 
     * @throws ApiError
     */
    public static partnerUpdateNowPartialUpdate(
guid: string,
data: PartnerUpdate,
): CancelablePromise<PartnerUpdate> {
        return __request(OpenAPI, {
            method: 'PATCH',
            url: '/partner/update/{guid}/now/',
            path: {
                'guid': guid,
            },
            body: data,
        });
    }

}
