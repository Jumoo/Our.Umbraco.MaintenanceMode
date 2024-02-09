/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class MaintenanceModeResource {

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
