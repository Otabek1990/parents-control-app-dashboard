/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

export type UserLogin = {
    readonly user_id?: number;
    readonly user_guid?: string;
    username: string;
    password: string;
    readonly access?: string;
    readonly refresh?: string;
    readonly role?: UserLogin.role;
};

export namespace UserLogin {

    export enum role {
        ADMIN = 'ADMIN',
        PARTNER = 'PARTNER',
        AGENT = 'AGENT',
        OPERATOR = 'OPERATOR',
        PARENT = 'PARENT',
        CHIEFACCOUNTANT = 'CHIEFACCOUNTANT',
        PARTNERACCOUNTANT = 'PARTNERACCOUNTANT',
    }


}
