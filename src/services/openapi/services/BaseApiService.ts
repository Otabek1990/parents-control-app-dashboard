/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { UserLogin } from '../models/UserLogin';

import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class BaseApiService {

    /**
     * District List API View
     * @returns any 
     * @throws ApiError
     */
    public static baseApiDistrictListList(): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/base-api/district-list/',
        });
    }

    /**
     * All users login views
     * @param data 
     * @returns UserLogin 
     * @throws ApiError
     */
    public static baseApiLoginCreate(
data: UserLogin,
): CancelablePromise<UserLogin> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/base-api/login/',
            body: data,
        });
    }

    /**
     * Me List(List) API view
     * @param search A search term.
     * @returns any 
     * @throws ApiError
     */
    public static baseApiMeList(
search?: string,
): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/base-api/me/',
            query: {
                'search': search,
            },
        });
    }

    /**
     * Quarters List API View
     * @returns any 
     * @throws ApiError
     */
    public static baseApiQuarterListList(): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/base-api/quarter-list/',
        });
    }

    /**
     * Region List API View
     * @returns any 
     * @throws ApiError
     */
    public static baseApiRegionListList(): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/base-api/region-list/',
        });
    }

}
