/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { MaintenanceModeStatus } from '../models/MaintenanceModeStatus';

import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class MaintenanceModeResource {

    /**
     * @returns any Success
     * @throws ApiError
     */
    public static getStatus(): CancelablePromise<MaintenanceModeStatus> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/umbraco/maintenance/api/v1/GetStatus',
        });
    }

    /**
     * @returns any Success
     * @throws ApiError
     */
    public static toggleFrozen({
maintenanceMode,
}: {
maintenanceMode?: boolean,
}): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/umbraco/maintenance/api/v1/ToggleFrozen',
            query: {
                'maintenanceMode': maintenanceMode,
            },
        });
    }

    /**
     * @returns any Success
     * @throws ApiError
     */
    public static toggleMode({
maintenanceMode,
}: {
maintenanceMode?: boolean,
}): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/umbraco/maintenance/api/v1/ToggleMode',
            query: {
                'maintenanceMode': maintenanceMode,
            },
        });
    }

}
