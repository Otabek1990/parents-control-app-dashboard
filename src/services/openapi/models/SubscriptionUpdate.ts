/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

export type SubscriptionUpdate = {
    readonly id?: number;
    readonly guid?: string;
    parent?: number | null;
    tarif?: number | null;
    activated_date?: string | null;
    expired_date?: string | null;
    is_active?: boolean;
    is_successfully_paid?: boolean;
    status?: SubscriptionUpdate.status | null;
    created_at?: string;
};

export namespace SubscriptionUpdate {

    export enum status {
        FREE = 'free',
        STANDARD = 'standard',
        ECONOM = 'econom',
        PREMIUM = 'premium',
    }


}
