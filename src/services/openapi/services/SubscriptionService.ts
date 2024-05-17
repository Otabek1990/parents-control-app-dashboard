/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { SubscriptionCreate } from '../models/SubscriptionCreate';
import type { SubscriptionList } from '../models/SubscriptionList';
import type { SubscriptionUpdate } from '../models/SubscriptionUpdate';
import type { TariffCreate } from '../models/TariffCreate';
import type { TariffList } from '../models/TariffList';
import type { TariffUpdate } from '../models/TariffUpdate';

import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class SubscriptionService {

    /**
     * Subscription Create(Post) api view
     * @param data 
     * @returns SubscriptionCreate 
     * @throws ApiError
     */
    public static subscriptionCreateCreate(
data: SubscriptionCreate,
): CancelablePromise<SubscriptionCreate> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/subscription/create/',
            body: data,
        });
    }

    /**
     * Subscription Delete(Delete) API view
     * @param guid 
     * @returns SubscriptionList 
     * @throws ApiError
     */
    public static subscriptionDeleteNowRead(
guid: string,
): CancelablePromise<SubscriptionList> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/subscription/delete/{guid}/now/',
            path: {
                'guid': guid,
            },
        });
    }

    /**
     * Subscription Delete(Delete) API view
     * @param guid 
     * @returns void 
     * @throws ApiError
     */
    public static subscriptionDeleteNowDelete(
guid: string,
): CancelablePromise<void> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/subscription/delete/{guid}/now/',
            path: {
                'guid': guid,
            },
        });
    }

    /**
     * Subscription Detail(Detail) API view
     * @param guid 
     * @returns SubscriptionList 
     * @throws ApiError
     */
    public static subscriptionDetailNowRead(
guid: string,
): CancelablePromise<SubscriptionList> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/subscription/detail/{guid}/now/',
            path: {
                'guid': guid,
            },
        });
    }

    /**
     * Subscription List(List) API view
     * @param search A search term.
     * @param limit Number of results to return per page.
     * @param offset The initial index from which to return the results.
     * @returns any 
     * @throws ApiError
     */
    public static subscriptionListList(
search?: string,
limit?: number,
offset?: number,
): CancelablePromise<{
count: number;
next?: string | null;
previous?: string | null;
results: Array<SubscriptionList>;
}> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/subscription/list/',
            query: {
                'search': search,
                'limit': limit,
                'offset': offset,
            },
        });
    }

    /**
     * Parent Profile Subscription List(Get) API view
     * @param guid 
     * @returns SubscriptionList 
     * @throws ApiError
     */
    public static subscriptionParentProfileSubscriptionRead(
guid: string,
): CancelablePromise<SubscriptionList> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/subscription/parent-profile/{guid}/subscription/',
            path: {
                'guid': guid,
            },
        });
    }

    /**
     * Tariff Create(Post) api view
     * @param data 
     * @returns TariffCreate 
     * @throws ApiError
     */
    public static subscriptionTariffCreateCreate(
data: TariffCreate,
): CancelablePromise<TariffCreate> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/subscription/tariff-create/',
            body: data,
        });
    }

    /**
     * Tariff Delete(Delete) API view
     * @param guid 
     * @returns TariffList 
     * @throws ApiError
     */
    public static subscriptionTariffDeleteNowRead(
guid: string,
): CancelablePromise<TariffList> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/subscription/tariff-delete/{guid}/now/',
            path: {
                'guid': guid,
            },
        });
    }

    /**
     * Tariff Delete(Delete) API view
     * @param guid 
     * @returns void 
     * @throws ApiError
     */
    public static subscriptionTariffDeleteNowDelete(
guid: string,
): CancelablePromise<void> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/subscription/tariff-delete/{guid}/now/',
            path: {
                'guid': guid,
            },
        });
    }

    /**
     * Tariff Detail(Detail) API view
     * @param guid 
     * @returns TariffList 
     * @throws ApiError
     */
    public static subscriptionTariffDetailNowRead(
guid: string,
): CancelablePromise<TariffList> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/subscription/tariff-detail/{guid}/now/',
            path: {
                'guid': guid,
            },
        });
    }

    /**
     * Tariff List(List) API view
     * @param search A search term.
     * @param limit Number of results to return per page.
     * @param offset The initial index from which to return the results.
     * @returns any 
     * @throws ApiError
     */
    public static subscriptionTariffListList(
search?: string,
limit?: number,
offset?: number,
): CancelablePromise<{
count: number;
next?: string | null;
previous?: string | null;
results: Array<TariffList>;
}> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/subscription/tariff-list/',
            query: {
                'search': search,
                'limit': limit,
                'offset': offset,
            },
        });
    }

    /**
     * Tariff Put(Put) API view
     * @param guid 
     * @returns TariffUpdate 
     * @throws ApiError
     */
    public static subscriptionTariffUpdateNowRead(
guid: string,
): CancelablePromise<TariffUpdate> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/subscription/tariff-update/{guid}/now/',
            path: {
                'guid': guid,
            },
        });
    }

    /**
     * Tariff Put(Put) API view
     * @param guid 
     * @param data 
     * @returns TariffUpdate 
     * @throws ApiError
     */
    public static subscriptionTariffUpdateNowUpdate(
guid: string,
data: TariffUpdate,
): CancelablePromise<TariffUpdate> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/subscription/tariff-update/{guid}/now/',
            path: {
                'guid': guid,
            },
            body: data,
        });
    }

    /**
     * Tariff Put(Put) API view
     * @param guid 
     * @param data 
     * @returns TariffUpdate 
     * @throws ApiError
     */
    public static subscriptionTariffUpdateNowPartialUpdate(
guid: string,
data: TariffUpdate,
): CancelablePromise<TariffUpdate> {
        return __request(OpenAPI, {
            method: 'PATCH',
            url: '/subscription/tariff-update/{guid}/now/',
            path: {
                'guid': guid,
            },
            body: data,
        });
    }

    /**
     * Subscription Put(Put) API view
     * @param guid 
     * @returns SubscriptionUpdate 
     * @throws ApiError
     */
    public static subscriptionUpdateNowRead(
guid: string,
): CancelablePromise<SubscriptionUpdate> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/subscription/update/{guid}/now/',
            path: {
                'guid': guid,
            },
        });
    }

    /**
     * Subscription Put(Put) API view
     * @param guid 
     * @param data 
     * @returns SubscriptionUpdate 
     * @throws ApiError
     */
    public static subscriptionUpdateNowUpdate(
guid: string,
data: SubscriptionUpdate,
): CancelablePromise<SubscriptionUpdate> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/subscription/update/{guid}/now/',
            path: {
                'guid': guid,
            },
            body: data,
        });
    }

    /**
     * Subscription Put(Put) API view
     * @param guid 
     * @param data 
     * @returns SubscriptionUpdate 
     * @throws ApiError
     */
    public static subscriptionUpdateNowPartialUpdate(
guid: string,
data: SubscriptionUpdate,
): CancelablePromise<SubscriptionUpdate> {
        return __request(OpenAPI, {
            method: 'PATCH',
            url: '/subscription/update/{guid}/now/',
            path: {
                'guid': guid,
            },
            body: data,
        });
    }

}
