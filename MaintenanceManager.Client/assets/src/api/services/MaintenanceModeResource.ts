/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { MaintenanceModeSettings } from '../models/MaintenanceModeSettings';
import type { MaintenanceModeStatus } from '../models/MaintenanceModeStatus';

import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class MaintenanceModeResource {

    /**
     * @returns any Success
     * @throws ApiError
     */
    public static getSettings(): CancelablePromise<MaintenanceModeSettings> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/umbraco/maintenance/api/v1/GetSettings',
        });
    }

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
    public static saveSettings({
requestBody,
}: {
requestBody?: MaintenanceModeSettings,
}): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/umbraco/maintenance/api/v1/SaveSettings',
            body: requestBody,
            mediaType: 'application/json',
        });
    }

    /**
     * @returns any Success
     * @throws ApiError
     */
    public static toggleAccess({
maintenanceMode,
}: {
maintenanceMode?: boolean,
}): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/umbraco/maintenance/api/v1/ToggleAccess',
            query: {
                'maintenanceMode': maintenanceMode,
            },
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
