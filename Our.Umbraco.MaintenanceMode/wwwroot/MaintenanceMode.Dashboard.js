﻿(function () {

    'use strict';

    function maintenanceModeDashboardController($scope,
        editorService, overlayService,
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

            if (targetMode) {
                overlayService.confirm({

                    title: 'Turn maintence mode on',
                    content: 'If you turn on maintance mode visitors to your site will get a holding page.',
                    disableBackdropClick: true,
                    disableEscKey: true,
                    submit: function () {
                        doMaintenceMode(targetMode);
                        overlayService.close();
                    }
                });
            }
            else {
                doMaintenceMode(targetMode);
            }
        }

        function doMaintenceMode(targetMode) {

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

                overlayService.confirm({
                    title: 'Confirm Freeze',
                    content: 'If you freeze content, no one will be able to update content, media or members',
                    disableBackdropClick: true,
                    disableEscKey: true,
                    submit: function () {
                        // yes
                        doFreeze(freezeMode);
                        overlayService.close();
                    },
                });
            }
            else {
                doFreeze(freezeMode);
            }
        }

        function doFreeze(freezeMode)
        {

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

        function validate(status) {

            if (_.isEmpty(status.Settings.ViewModel.PageTitle)) {
                notificationsService.error("The 'Page Title' field is required");
                return false;
            }

            if (_.isEmpty(status.Settings.ViewModel.Title)) {
                notificationsService.error("The 'Title' field is required");
                return false;
            }

            if (_.isEmpty(status.Settings.ViewModel.Text)) {
                notificationsService.error("The 'Text' field is required");
                return false;
            }

            return true;
        }

        function openAdvanced() {

            editorService.open({
                status: vm.status,
                templates: vm.templates,
                title: 'Advanced Options',
                size: 'small',
                view: '/App_Plugins/Our.Umbraco.MaintenanceMode/advanced.html',
                submit: function (done) {
                    if (validate(vm.status)) {
                        console.log(vm.status);
                        editorService.close();
                        saveSettings();
                    };
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