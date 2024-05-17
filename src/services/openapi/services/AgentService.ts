/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { AgentCreate } from '../models/AgentCreate';
import type { AgentDetail } from '../models/AgentDetail';
import type { AgentList } from '../models/AgentList';
import type { AgentUpdate } from '../models/AgentUpdate';

import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class AgentService {

    /**
     * Agent Create(Post) api view
     * @param data 
     * @returns AgentCreate 
     * @throws ApiError
     */
    public static agentCreateCreate(
data: AgentCreate,
): CancelablePromise<AgentCreate> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/agent/create/',
            body: data,
        });
    }

    /**
     * Agent Delete(Delete) API view
     * @param guid 
     * @returns AgentList 
     * @throws ApiError
     */
    public static agentDeleteNowRead(
guid: string,
): CancelablePromise<AgentList> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/agent/delete/{guid}/now/',
            path: {
                'guid': guid,
            },
        });
    }

    /**
     * Agent Delete(Delete) API view
     * @param guid 
     * @returns void 
     * @throws ApiError
     */
    public static agentDeleteNowDelete(
guid: string,
): CancelablePromise<void> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/agent/delete/{guid}/now/',
            path: {
                'guid': guid,
            },
        });
    }

    /**
     * Agent Detail(Detail) API view
     * @param guid 
     * @returns AgentDetail 
     * @throws ApiError
     */
    public static agentDetailNowRead(
guid: string,
): CancelablePromise<AgentDetail> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/agent/detail/{guid}/now/',
            path: {
                'guid': guid,
            },
        });
    }

    /**
     * Agent List(List) API view
     * @param search A search term.
     * @param limit Number of results to return per page.
     * @param offset The initial index from which to return the results.
     * @returns any 
     * @throws ApiError
     */
    public static agentListList(
search?: string,
limit?: number,
offset?: number,
): CancelablePromise<{
count: number;
next?: string | null;
previous?: string | null;
results: Array<AgentList>;
}> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/agent/list/',
            query: {
                'search': search,
                'limit': limit,
                'offset': offset,
            },
        });
    }

    /**
     * Agent Put(Put) API view
     * @param guid 
     * @returns AgentUpdate 
     * @throws ApiError
     */
    public static agentUpdateNowRead(
guid: string,
): CancelablePromise<AgentUpdate> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/agent/update/{guid}/now/',
            path: {
                'guid': guid,
            },
        });
    }

    /**
     * Agent Put(Put) API view
     * @param guid 
     * @param data 
     * @returns AgentUpdate 
     * @throws ApiError
     */
    public static agentUpdateNowUpdate(
guid: string,
data: AgentUpdate,
): CancelablePromise<AgentUpdate> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/agent/update/{guid}/now/',
            path: {
                'guid': guid,
            },
            body: data,
        });
    }

    /**
     * Agent Put(Put) API view
     * @param guid 
     * @param data 
     * @returns AgentUpdate 
     * @throws ApiError
     */
    public static agentUpdateNowPartialUpdate(
guid: string,
data: AgentUpdate,
): CancelablePromise<AgentUpdate> {
        return __request(OpenAPI, {
            method: 'PATCH',
            url: '/agent/update/{guid}/now/',
            path: {
                'guid': guid,
            },
            body: data,
        });
    }

}
