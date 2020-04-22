(function () {

    'use strict';

    function maintenanceModeDashboardController($scope,
        editorService,
        notificationsService, maintenanceModeService, appState) {

        var vm = this;
        vm.loaded = false; 

        vm.templates = [];
        vm.buttonState = 'init';

        vm.toggleMode = toggleMode;
        vm.toggleFreeze = toggleFreeze;

        vm.getStatus = getStatus;
        vm.saveSettings = saveSettings;
        vm.triggerAccordian = triggerAccordian;
        vm.openAdvanced = openAdvanced;

        init();

        /////////////////////////////

        function toggleMode() {

            var targetMode = !vm.status.IsInMaintenanceMode;

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

        function toggleFreeze() {

            var freezeMode = !vm.status.IsContentFrozen;
            if (freezeMode) {
                var c = confirm('Are you sure? If you freeze content, no one will be able to update content, media or members');
                if (!c) {
                    return;
                }
            }

            maintenanceModeService.toggleFreeze(freezeMode)
                .then(function (result) {
                    vm.getStatus();

                    var msg = "Content is " + (freezeMode ? "On" : "Off");
                    notificationsService.success("Maintenance Mode", msg);

                }, function (error) {
                    notificationsService.error('Error', error.data.ExceptionMessage);
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

        function triggerAccordian() {
            const collapse = "collapse";
            const element = document.getElementById("maintanceModeAdvanced");

            if (element.classList.contains(collapse)) {
                element.classList.remove(collapse);
            } else {
                element.classList.add(collapse);
            }
        }

        function openAdvanced() {

            editorService.open({
                status: vm.status,
                templates: vm.templates,
                title: 'Advanced Options',
                size: 'small',
                view: '/App_Plugins/Our.Umbraco.MaintenanceModev8/advanced.html',
                submit: function (done) {
                    console.log(vm.status);
                    editorService.close();
                    saveSettings();
                },
                close: function () {
                    editorService.close();
                }
            })
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

    angular.module('umbraco').controller('maintenanceModeDashboardController', maintenanceModeDashboardController);
})();