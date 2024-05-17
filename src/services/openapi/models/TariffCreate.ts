/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

export type TariffCreate = {
    readonly id?: number;
    readonly guid?: string;
    name: string;
    price?: string | null;
    currency?: string | null;
    is_free?: boolean;
    is_premium?: boolean;
    is_standard?: boolean;
    is_econom?: boolean;
    is_monthly?: boolean;
    is_yearly?: boolean;
    created_at?: string;
};
