﻿using Microsoft.Extensions.Options;
using Our.Umbraco.MaintenanceMode.Models;
using Our.Umbraco.MaintenanceMode.Models.Schema;
using Our.Umbraco.MaintenanceMode.Notifications;
using Serilog;
using System;
using System.Text.Json;
using System.Threading.Tasks;
using Umbraco.Cms.Core.Events;
using Umbraco.Cms.Infrastructure.Scoping;

namespace Our.Umbraco.MaintenanceMode.Providers
{
    public class DatabaseStorageProvider : IStorageProvider
    {
        private readonly Configurations.MaintenanceModeSettings _maintenanceModeSettings;

        private readonly ILogger _logger;
        private readonly IEventAggregator _eventAggregator;
        private readonly IScopeProvider _scopeProvider;

        public DatabaseStorageProvider(
            ILogger logger,
            IOptions<Configurations.MaintenanceModeSettings> maintenanceModeSettings,
            IEventAggregator eventAggregator,
            IScopeProvider scope)
        {
            _maintenanceModeSettings = maintenanceModeSettings.Value;
            _logger = logger;
            _eventAggregator = eventAggregator;
            _scopeProvider = scope;
        }

        public async Task<MaintenanceModeStatus> Read()
        {
            try
            {
                // read from the database
                using var scope = _scopeProvider.CreateScope();

                var db = scope.Database;
                var dbStatus = await db.QueryAsync<MaintenanceModeSchema>()
                                       .Where(x => x.Id == MaintenanceMode.MaintenanceConfigRootId)
                                       .FirstOrDefault();

                if (dbStatus is null)
                {
                    _logger.Warning("Maintenance mode status table was queried but is empty.");
                    return null;
                }

                var status = JsonSerializer.Deserialize<MaintenanceModeStatus>(dbStatus.Value);
             
                scope.Complete();
                
                return status;

            }
            catch (Exception ex)
            {
                _logger.Warning(ex, string.Concat("Failed to load Status ", ex.Message));
            }

            return null;
        }

        public async Task Save(MaintenanceModeStatus status)
        {
            try
            {
                string json = JsonSerializer.Serialize(status);

                using var scope = _scopeProvider.CreateScope();
                
                var db = scope.Database;

                var dbStatus = await db.QueryAsync<MaintenanceModeSchema>()
                                       .Where(x => x.Id == MaintenanceMode.MaintenanceConfigRootId)
                                       .FirstOrDefault();

                if (dbStatus is null)
                {
                    await db.InsertAsync(new MaintenanceModeSchema() {  Id = MaintenanceMode.MaintenanceConfigRootId, Value = json });
                }
                else
                {
                    dbStatus.Value = json;
                    await db.UpdateAsync(dbStatus);
                }

                scope.Complete();

                _eventAggregator.Publish(new MaintenanceModeSavedNotification(status));
            }
            catch (Exception ex)
            {
                _logger.Debug(ex, string.Concat("Failed to save config ", ex.Message));
            }
        }
    }
}