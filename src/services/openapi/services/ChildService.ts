/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { ChildCreate } from '../models/ChildCreate';
import type { ChildList } from '../models/ChildList';
import type { ChildPost } from '../models/ChildPost';
import type { ChildUpdate } from '../models/ChildUpdate';

import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class ChildService {

    /**
     * Child Create(Post) for mobile API view
     * @param data 
     * @returns ChildCreate 
     * @throws ApiError
     */
    public static childCreateCreate(
data: ChildCreate,
): CancelablePromise<ChildCreate> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/child/create/',
            body: data,
        });
    }

    /**
     * Child Delete(Delete) API view
     * @param guid 
     * @returns ChildList 
     * @throws ApiError
     */
    public static childDeleteNowRead(
guid: string,
): CancelablePromise<ChildList> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/child/delete/{guid}/now/',
            path: {
                'guid': guid,
            },
        });
    }

    /**
     * Child Delete(Delete) API view
     * @param guid 
     * @returns void 
     * @throws ApiError
     */
    public static childDeleteNowDelete(
guid: string,
): CancelablePromise<void> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/child/delete/{guid}/now/',
            path: {
                'guid': guid,
            },
        });
    }

    /**
     * Child Detail(Detail) API view
     * @param guid 
     * @returns ChildList 
     * @throws ApiError
     */
    public static childDetailNowRead(
guid: string,
): CancelablePromise<ChildList> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/child/detail/{guid}/now/',
            path: {
                'guid': guid,
            },
        });
    }

    /**
     * Child List(List) API view
     * @param search A search term.
     * @param limit Number of results to return per page.
     * @param offset The initial index from which to return the results.
     * @returns any 
     * @throws ApiError
     */
    public static childList(
q?: string,
limit?: number,
offset?: number,
): CancelablePromise<{
count: number;
next?: string | null;
previous?: string | null;
results: Array<ChildList>;
}> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/admin-panel-child/list/',
            // admin-panel-child/list/
            query: {
                'q': q,
                'limit': limit,
                'offset': offset,
            },
        });
    }

    /**
     * Parent Child List(List) API view
     * @param guid 
     * @param search A search term.
     * @returns ChildList 
     * @throws ApiError
     */
    public static childParentChildListList(
guid: string,
search?: string,
): CancelablePromise<Array<ChildList>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/child/parent/{guid}/child-list/',
            path: {
                'guid': guid,
            },
            query: {
                'search': search,
            },
        });
    }

    /**
     * Child Post(Post) for mobile api view
     * @param data 
     * @returns ChildPost 
     * @throws ApiError
     */
    public static childPostCreate(
data: ChildPost,
): CancelablePromise<ChildPost> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/child/post/',
            body: data,
        });
    }

    /**
     * Child Put(Put) API view
     * @param guid 
     * @returns ChildUpdate 
     * @throws ApiError
     */
    public static childUpdateNowRead(
guid: string,
): CancelablePromise<ChildUpdate> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/child/update/{guid}/now/',
            path: {
                'guid': guid,
            },
        });
    }

    /**
     * Child Put(Put) API view
     * @param guid 
     * @param data 
     * @returns ChildUpdate 
     * @throws ApiError
     */
    public static childUpdateNowUpdate(
guid: string,
data: ChildUpdate,
): CancelablePromise<ChildUpdate> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/child/update/{guid}/now/',
            path: {
                'guid': guid,
            },
            body: data,
        });
    }

    /**
     * Child Put(Put) API view
     * @param guid 
     * @param data 
     * @returns ChildUpdate 
     * @throws ApiError
     */
    public static childUpdateNowPartialUpdate(
guid: string,
data: ChildUpdate,
): CancelablePromise<ChildUpdate> {
        return __request(OpenAPI, {
            method: 'PATCH',
            url: '/child/update/{guid}/now/',
            path: {
                'guid': guid,
            },
            body: data,
        });
    }

}
