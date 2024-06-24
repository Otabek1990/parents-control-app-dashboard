/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { OperatorCreate } from '../models/OperatorCreate';
import type { OperatorDetail } from '../models/OperatorDetail';
import type { OperatorList } from '../models/OperatorList';
import type { OperatorUpdate } from '../models/OperatorUpdate';

import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class OperatorService {

    /**
     * Operator Create(Post) api view
     * @param data 
     * @returns OperatorCreate 
     * @throws ApiError
     */
    public static operatorCreateCreate(
data: OperatorCreate,
): CancelablePromise<OperatorCreate> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/operator/create/',
            body: data,
        });
    }

    /**
     * Operator Delete(Delete) API view
     * @param guid 
     * @returns OperatorList 
     * @throws ApiError
     */
    public static operatorDeleteNowRead(
guid: string,
): CancelablePromise<OperatorList> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/operator/delete/{guid}/now/',
            path: {
                'guid': guid,
            },
        });
    }

    /**
     * Operator Delete(Delete) API view
     * @param guid 
     * @returns void 
     * @throws ApiError
     */
    public static operatorDeleteNowDelete(
guid: string,
): CancelablePromise<void> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/operator/delete/{guid}/now/',
            path: {
                'guid': guid,
            },
        });
    }

    /**
     * Operator Detail(Detail) API view
     * @param guid 
     * @returns OperatorDetail 
     * @throws ApiError
     */
    public static operatorDetailNowRead(
guid: string,
): CancelablePromise<OperatorDetail> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/operator/detail/{guid}/now/',
            path: {
                'guid': guid,
            },
        });
    }

    /**
     * Operator List(List) API view
     * @param search A search term.
     * @param limit Number of results to return per page.
     * @param offset The initial index from which to return the results.
     * @returns any 
     * @throws ApiError
     */
    public static operatorListList(
search?: string,
limit?: number,
offset?: number,
): CancelablePromise<{
count: number;
next?: string | null;
previous?: string | null;
results: Array<OperatorList>;
}> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/admin-panel-operator/list/',
            // admin-panel-operator/list/
            query: {
                'search': search,
                'limit': limit,
                'offset': offset,
            },
        });
    }

    /**
     * Operator Put(Put) API view
     * @param guid 
     * @returns OperatorUpdate 
     * @throws ApiError
     */
    public static operatorUpdateNowRead(
guid: string,
): CancelablePromise<OperatorUpdate> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/operator/update/{guid}/now/',
            path: {
                'guid': guid,
            },
        });
    }

    /**
     * Operator Put(Put) API view
     * @param guid 
     * @param data 
     * @returns OperatorUpdate 
     * @throws ApiError
     */
    public static operatorUpdateNowUpdate(
guid: string,
data: OperatorUpdate,
): CancelablePromise<OperatorUpdate> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/operator/update/{guid}/now/',
            path: {
                'guid': guid,
            },
            body: data,
        });
    }

    /**
     * Operator Put(Put) API view
     * @param guid 
     * @param data 
     * @returns OperatorUpdate 
     * @throws ApiError
     */
    public static operatorUpdateNowPartialUpdate(
guid: string,
data: OperatorUpdate,
): CancelablePromise<OperatorUpdate> {
        return __request(OpenAPI, {
            method: 'PATCH',
            url: '/operator/update/{guid}/now/',
            path: {
                'guid': guid,
            },
            body: data,
        });
    }

}
