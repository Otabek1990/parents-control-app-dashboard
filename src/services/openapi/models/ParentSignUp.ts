/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

export type ParentSignUp = {
    readonly id?: number;
    readonly guid?: string;
    /**
     * Required. 150 characters or fewer. Letters, digits and @/./+/-/_ only.
     */
    username: string;
    password: string;
    code?: string | null;
    created_at?: string;
};
