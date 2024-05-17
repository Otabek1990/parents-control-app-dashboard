/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { ChiefAccountantCreate } from '../models/ChiefAccountantCreate';
import type { ChiefAccountantDetail } from '../models/ChiefAccountantDetail';
import type { ChiefAccountantList } from '../models/ChiefAccountantList';
import type { ChiefAccountantUpdate } from '../models/ChiefAccountantUpdate';
import type { PartnerAccountantCreate } from '../models/PartnerAccountantCreate';
import type { PartnerAccountantDetail } from '../models/PartnerAccountantDetail';
import type { PartnerAccountantList } from '../models/PartnerAccountantList';
import type { PartnerAccountantUpdate } from '../models/PartnerAccountantUpdate';

import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class AccountantService {

    /**
     * ChiefAccountant Create(Post) api view
     * @param data 
     * @returns ChiefAccountantCreate 
     * @throws ApiError
     */
    public static accountantChiefCreateCreate(
data: ChiefAccountantCreate,
): CancelablePromise<ChiefAccountantCreate> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/accountant/chief-create/',
            body: data,
        });
    }

    /**
     * ChiefAccountant Delete(Delete) API view
     * @param guid 
     * @returns ChiefAccountantList 
     * @throws ApiError
     */
    public static accountantChiefDeleteNowRead(
guid: string,
): CancelablePromise<ChiefAccountantList> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/accountant/chief-delete/{guid}/now/',
            path: {
                'guid': guid,
            },
        });
    }

    /**
     * ChiefAccountant Delete(Delete) API view
     * @param guid 
     * @returns void 
     * @throws ApiError
     */
    public static accountantChiefDeleteNowDelete(
guid: string,
): CancelablePromise<void> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/accountant/chief-delete/{guid}/now/',
            path: {
                'guid': guid,
            },
        });
    }

    /**
     * ChiefAccountant Detail(Detail) API view
     * @param guid 
     * @returns ChiefAccountantDetail 
     * @throws ApiError
     */
    public static accountantChiefDetailNowRead(
guid: string,
): CancelablePromise<ChiefAccountantDetail> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/accountant/chief-detail/{guid}/now/',
            path: {
                'guid': guid,
            },
        });
    }

    /**
     * ChiefAccountant List(List) API view
     * @param search A search term.
     * @param limit Number of results to return per page.
     * @param offset The initial index from which to return the results.
     * @returns any 
     * @throws ApiError
     */
    public static accountantChiefListList(
search?: string,
limit?: number,
offset?: number,
): CancelablePromise<{
count: number;
next?: string | null;
previous?: string | null;
results: Array<ChiefAccountantList>;
}> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/accountant/chief-list/',
            query: {
                'search': search,
                'limit': limit,
                'offset': offset,
            },
        });
    }

    /**
     * ChiefAccountant Put(Put) API view
     * @param guid 
     * @returns ChiefAccountantUpdate 
     * @throws ApiError
     */
    public static accountantChiefUpdateNowRead(
guid: string,
): CancelablePromise<ChiefAccountantUpdate> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/accountant/chief-update/{guid}/now/',
            path: {
                'guid': guid,
            },
        });
    }

    /**
     * ChiefAccountant Put(Put) API view
     * @param guid 
     * @param data 
     * @returns ChiefAccountantUpdate 
     * @throws ApiError
     */
    public static accountantChiefUpdateNowUpdate(
guid: string,
data: ChiefAccountantUpdate,
): CancelablePromise<ChiefAccountantUpdate> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/accountant/chief-update/{guid}/now/',
            path: {
                'guid': guid,
            },
            body: data,
        });
    }

    /**
     * ChiefAccountant Put(Put) API view
     * @param guid 
     * @param data 
     * @returns ChiefAccountantUpdate 
     * @throws ApiError
     */
    public static accountantChiefUpdateNowPartialUpdate(
guid: string,
data: ChiefAccountantUpdate,
): CancelablePromise<ChiefAccountantUpdate> {
        return __request(OpenAPI, {
            method: 'PATCH',
            url: '/accountant/chief-update/{guid}/now/',
            path: {
                'guid': guid,
            },
            body: data,
        });
    }

    /**
     * PartnerAccountant Create(Post) api view
     * @param data 
     * @returns PartnerAccountantCreate 
     * @throws ApiError
     */
    public static accountantPartnerCreateCreate(
data: PartnerAccountantCreate,
): CancelablePromise<PartnerAccountantCreate> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/accountant/partner-create/',
            body: data,
        });
    }

    /**
     * PartnerAccountant Delete(Delete) API view
     * @param guid 
     * @returns PartnerAccountantList 
     * @throws ApiError
     */
    public static accountantPartnerDeleteNowRead(
guid: string,
): CancelablePromise<PartnerAccountantList> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/accountant/partner-delete/{guid}/now/',
            path: {
                'guid': guid,
            },
        });
    }

    /**
     * PartnerAccountant Delete(Delete) API view
     * @param guid 
     * @returns void 
     * @throws ApiError
     */
    public static accountantPartnerDeleteNowDelete(
guid: string,
): CancelablePromise<void> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/accountant/partner-delete/{guid}/now/',
            path: {
                'guid': guid,
            },
        });
    }

    /**
     * PartnerAccountant Detail(Detail) API view
     * @param guid 
     * @returns PartnerAccountantDetail 
     * @throws ApiError
     */
    public static accountantPartnerDetailNowRead(
guid: string,
): CancelablePromise<PartnerAccountantDetail> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/accountant/partner-detail/{guid}/now/',
            path: {
                'guid': guid,
            },
        });
    }

    /**
     * PartnerAccountant List(List) API view
     * @param search A search term.
     * @param limit Number of results to return per page.
     * @param offset The initial index from which to return the results.
     * @returns any 
     * @throws ApiError
     */
    public static accountantPartnerListList(
search?: string,
limit?: number,
offset?: number,
): CancelablePromise<{
count: number;
next?: string | null;
previous?: string | null;
results: Array<PartnerAccountantList>;
}> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/accountant/partner-list/',
            query: {
                'search': search,
                'limit': limit,
                'offset': offset,
            },
        });
    }

    /**
     * PartnerAccountant Put(Put) API view
     * @param guid 
     * @returns PartnerAccountantUpdate 
     * @throws ApiError
     */
    public static accountantPartnerUpdateNowRead(
guid: string,
): CancelablePromise<PartnerAccountantUpdate> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/accountant/partner-update/{guid}/now/',
            path: {
                'guid': guid,
            },
        });
    }

    /**
     * PartnerAccountant Put(Put) API view
     * @param guid 
     * @param data 
     * @returns PartnerAccountantUpdate 
     * @throws ApiError
     */
    public static accountantPartnerUpdateNowUpdate(
guid: string,
data: PartnerAccountantUpdate,
): CancelablePromise<PartnerAccountantUpdate> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/accountant/partner-update/{guid}/now/',
            path: {
                'guid': guid,
            },
            body: data,
        });
    }

    /**
     * PartnerAccountant Put(Put) API view
     * @param guid 
     * @param data 
     * @returns PartnerAccountantUpdate 
     * @throws ApiError
     */
    public static accountantPartnerUpdateNowPartialUpdate(
guid: string,
data: PartnerAccountantUpdate,
): CancelablePromise<PartnerAccountantUpdate> {
        return __request(OpenAPI, {
            method: 'PATCH',
            url: '/accountant/partner-update/{guid}/now/',
            path: {
                'guid': guid,
            },
            body: data,
        });
    }

}
