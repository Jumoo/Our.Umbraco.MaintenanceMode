(function () {

    'use strict';

    function dashboardController($scope, notificationsService, maintenanceModeService) {

        var vm = this;
        vm.loaded = false; 

        vm.templates = [];
        vm.buttonState = 'init';

        vm.toggleMode = toggleMode;
        vm.getStatus = getStatus;
        vm.saveSettings = saveSettings;

        init();

        /////////////////////////////

        function toggleMode() {

            var targetMode = !vm.status.IsInMaintenanceMode

            if (targetMode)
            {
                // turning it on, so we should get some confirmation ?
                var c = confirm('are you sure, if you turn on maintance mode visitors to your site will get a holding page.');
                if (!c) {
                    return;
                }
            }

            maintenanceModeService.toggleMode(targetMode)
                .then(function (result) {
                    vm.getStatus();

                    var msg = "Maintenance mode is " + (targetMode ? "On" : "Off");
                    notificationsService.success("Maintenance Mode", msg);

                }, function (error) {

                });
        }

        function getStatus()
        {
            maintenanceModeService.getStatus()
                .then(function (result) {
                    vm.status = result.data;

                    if (!vm.loaded) {
                        // first load we watch 
                        $scope.$watch("vm.status.Settings.AllowBackOfficeUsersThrough",
                            function (newValue, oldValue) {
                                if (newValue != oldValue) {
                                    saveSettings();
                                }
                            });
                    }

                    vm.loaded = true;
                }, function (error) {

                });
        }

        function saveSettings() {

            maintenanceModeService.saveSettings(vm.status.Settings)
                .then(function (result) {
                    notificationsService.success('Updated', "Settings Saved");
                    vm.getStatus();
                }, function (error) {

                });
        }


        ///////////////////////////

        function getTemplates() {
            maintenanceModeService.getTemplates()
                .then(function (result) {
                    vm.templates = result.data;
                });
        }


        function init() {
            vm.getStatus();
            getTemplates();
        }

    }

    angular.module('umbraco')
        .controller('maintenanceModeDashboardConbtroller', dashboardController);

})();