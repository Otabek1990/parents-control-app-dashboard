/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { ParenChildCodeCreate } from '../models/ParenChildCodeCreate';
import type { ParentCheckSms } from '../models/ParentCheckSms';
import type { ParentCreate } from '../models/ParentCreate';
import type { ParentDetail } from '../models/ParentDetail';
import type { ParentList } from '../models/ParentList';
import type { ParentLogin } from '../models/ParentLogin';
import type { ParentProfileList } from '../models/ParentProfileList';
import type { ParentProfileUpdate } from '../models/ParentProfileUpdate';
import type { ParentSignUp } from '../models/ParentSignUp';
import type { ParentUpdate } from '../models/ParentUpdate';

import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class ParentService {

    /**
     * Parent Check user generate code
     * @param data 
     * @returns ParentCheckSms 
     * @throws ApiError
     */
    public static parentCheckCreate(
data: ParentCheckSms,
): CancelablePromise<ParentCheckSms> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/parent/check/',
            body: data,
        });
    }

    /**
     * Parent Create(Post) api view
     * @param data 
     * @returns ParentCreate 
     * @throws ApiError
     */
    public static parentCreateCreate(
data: ParentCreate,
): CancelablePromise<ParentCreate> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/parent/create/',
            body: data,
        });
    }

    /**
     * Parent Delete(Delete) API view
     * @param guid 
     * @returns ParentList 
     * @throws ApiError
     */
    public static parentDeleteNowRead(
guid: string,
): CancelablePromise<ParentList> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/parent/delete/{guid}/now/',
            path: {
                'guid': guid,
            },
        });
    }

    /**
     * Parent Delete(Delete) API view
     * @param guid 
     * @returns void 
     * @throws ApiError
     */
    public static parentDeleteNowDelete(
guid: string,
): CancelablePromise<void> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/parent/delete/{guid}/now/',
            path: {
                'guid': guid,
            },
        });
    }

    /**
     * Parent Detail(Detail) API view
     * @param guid 
     * @returns ParentDetail 
     * @throws ApiError
     */
    public static parentDetailNowRead(
guid: string | number,
): CancelablePromise<ParentDetail> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/admin-panel-parent/detail/{guid}/',
            path: {
                'guid': guid,
            },
        });
    }

    /**
     * Parent List(List) API view
     * @param search A search term.
     * @param limit Number of results to return per page.
     * @param offset The initial index from which to return the results.
     * @returns any 
     * @throws ApiError
     */
    public static parentListList(
search?: string,
limit?: number,
offset?: number,
): CancelablePromise<{
count: number;
next?: string | null;
previous?: string | null;
results: Array<ParentList>;
}> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/admin-panel-parent/list/',
            query: {
                'search': search,
                'limit': limit,
                'offset': offset,
            },
        });
    }

    /**
     * Parent Login(Post) api view
     * @param data 
     * @returns ParentLogin 
     * @throws ApiError
     */
    public static parentLoginCreate(
data: ParentLogin,
): CancelablePromise<ParentLogin> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/parent/login/',
            body: data,
        });
    }

    /**
     * Parent Child Code Create(Put) api view
     * @param guid 
     * @param data 
     * @returns ParenChildCodeCreate 
     * @throws ApiError
     */
    public static parentParentChildAddUpdate(
guid: string,
data: ParenChildCodeCreate,
): CancelablePromise<ParenChildCodeCreate> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/parent/parent/{guid}/child-add/',
            path: {
                'guid': guid,
            },
            body: data,
        });
    }

    /**
     * ParentProfile Detail(Detail) API view
     * @param guid 
     * @returns ParentProfileList 
     * @throws ApiError
     */
    public static parentProfileDetailNowRead(
guid: string,
): CancelablePromise<ParentProfileList> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/parent/profile-detail/{guid}/now/',
            path: {
                'guid': guid,
            },
        });
    }

    /**
     * ParentProfile List(List) API view
     * @param guid 
     * @param search A search term.
     * @param limit Number of results to return per page.
     * @param offset The initial index from which to return the results.
     * @returns any 
     * @throws ApiError
     */
    public static parentProfileListNowList(
guid: string,
search?: string,
limit?: number,
offset?: number,
): CancelablePromise<{
count: number;
next?: string | null;
previous?: string | null;
results: Array<ParentProfileList>;
}> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/parent/profile-list/{guid}/now/',
            path: {
                'guid': guid,
            },
            query: {
                'search': search,
                'limit': limit,
                'offset': offset,
            },
        });
    }

    /**
     * ParentProfile Put(Put) API view
     * @param guid 
     * @returns ParentProfileUpdate 
     * @throws ApiError
     */
    public static parentProfileUpdateNowRead(
guid: string,
): CancelablePromise<ParentProfileUpdate> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/parent/profile-update/{guid}/now/',
            path: {
                'guid': guid,
            },
        });
    }

    /**
     * ParentProfile Put(Put) API view
     * @param guid 
     * @param data 
     * @returns ParentProfileUpdate 
     * @throws ApiError
     */
    public static parentProfileUpdateNowUpdate(
guid: string,
data: ParentProfileUpdate,
): CancelablePromise<ParentProfileUpdate> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/parent/profile-update/{guid}/now/',
            path: {
                'guid': guid,
            },
            body: data,
        });
    }

    /**
     * ParentProfile Put(Put) API view
     * @param guid 
     * @param data 
     * @returns ParentProfileUpdate 
     * @throws ApiError
     */
    public static parentProfileUpdateNowPartialUpdate(
guid: string,
data: ParentProfileUpdate,
): CancelablePromise<ParentProfileUpdate> {
        return __request(OpenAPI, {
            method: 'PATCH',
            url: '/parent/profile-update/{guid}/now/',
            path: {
                'guid': guid,
            },
            body: data,
        });
    }

    /**
     * Parent SignUp(Post) api view
     * @param data 
     * @returns ParentSignUp 
     * @throws ApiError
     */
    public static parentSignupCreate(
data: ParentSignUp,
): CancelablePromise<ParentSignUp> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/parent/signup/',
            body: data,
        });
    }

    /**
     * Parent Put(Put) API view
     * @param guid 
     * @returns ParentUpdate 
     * @throws ApiError
     */
    public static parentUpdateNowRead(
guid: string,
): CancelablePromise<ParentUpdate> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/parent/update/{guid}/now/',
            path: {
                'guid': guid,
            },
        });
    }

    /**
     * Parent Put(Put) API view
     * @param guid 
     * @param data 
     * @returns ParentUpdate 
     * @throws ApiError
     */
    public static parentUpdateNowUpdate(
guid: string,
data: ParentUpdate,
): CancelablePromise<ParentUpdate> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/parent/update/{guid}/now/',
            path: {
                'guid': guid,
            },
            body: data,
        });
    }

    /**
     * Parent Put(Put) API view
     * @param guid 
     * @param data 
     * @returns ParentUpdate 
     * @throws ApiError
     */
    public static parentUpdateNowPartialUpdate(
guid: string,
data: ParentUpdate,
): CancelablePromise<ParentUpdate> {
        return __request(OpenAPI, {
            method: 'PATCH',
            url: '/parent/update/{guid}/now/',
            path: {
                'guid': guid,
            },
            body: data,
        });
    }

}
