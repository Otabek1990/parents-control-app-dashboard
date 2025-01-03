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
data: FormData,
): CancelablePromise<OperatorCreate> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/admin-panel-operator/create/',
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
            url: '/admin-panel-operator/delete/{guid}/now/',
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
id: string | number
): CancelablePromise<void> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: `/admin-panel-operator/delete/${id}/`,
            path: {
                'id': id,
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
id: string | number,
): CancelablePromise<OperatorDetail> {
        return __request(OpenAPI, {
            method: 'GET',
            url: `/admin-panel-operator/detail/${id}/`,
            path: {
                'id': id,
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
q?: string,
limit?: number,
offset?: number,
startDate?:string,
endDate?:string
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
                'q': q,
                'limit': limit,
                'offset': offset,
                'start_date':startDate,
                'end_date':endDate
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
id: string | number,
data: FormData,
): CancelablePromise<OperatorUpdate> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: `/admin-panel-operator/update/{id}/`,
            path: {
                'id': id,
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
