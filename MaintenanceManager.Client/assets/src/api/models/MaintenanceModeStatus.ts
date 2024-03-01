/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { MaintenanceModeSettings } from './MaintenanceModeSettings';

export type MaintenanceModeStatus = {
    isInMaintenanceMode: boolean;
    usingWebConfig: boolean;
    settings?: MaintenanceModeSettings | null;
    isContentFrozen: boolean;
};
