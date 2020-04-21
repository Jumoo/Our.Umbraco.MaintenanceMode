(function () {

    'use strict';

    function maintenanceModeService($http) {

        var services = Umbraco.Sys.ServerVariables;

        var serviceRoot = Umbraco.Sys.ServerVariables.MaintenanceMode.Service;

        var service = {

            getStatus: getStatus,
            toggleMode: toggleMode,
            saveSettings: saveSettings,

            getTemplates : getTemplates
        };

        return service; 

        /////////////////////

        function getStatus() {
            return $http.get(serviceRoot + "GetStatus");
        }

        function toggleMode(maintenanceMode) {
            return $http.post(serviceRoot + "ToggleMode?maintenanceMode=" + maintenanceMode);
        }

        function saveSettings(settings) {
            return $http.post(serviceRoot + "SaveSettings", settings);
        }


        function getTemplates() {
            return $http.get(serviceRoot + "GetTemplates");
        }

    }

    angular.module('umbraco.services')
        .factory('maintenanceModeService', maintenanceModeService);

})();