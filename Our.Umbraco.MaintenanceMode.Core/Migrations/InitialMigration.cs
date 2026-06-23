using Microsoft.Extensions.Options;
using Our.Umbraco.MaintenanceMode.Configurations;
using Our.Umbraco.MaintenanceMode.Models.Schema;
using System.Threading.Tasks;
using Umbraco.Cms.Infrastructure.Migrations;

namespace Our.Umbraco.MaintenanceMode.Migrations
{
    public sealed class InitialMigration : AsyncMigrationBase
    {
        public const string Key = "maintenance-mode-init";

        private readonly MaintenanceModeSettings _maintenanceModeSettings;

        public InitialMigration(
            IMigrationContext context,
            IOptions<MaintenanceModeSettings> maintenanceModeSettings
        ) : base(context) 
        {
        }

        protected override Task MigrateAsync()
        {
            if (!TableExists(nameof(MaintenanceModeSchema)))
            {
                Create.Table<MaintenanceModeSchema>().Do();
            }
            return Task.CompletedTask;
        }
    }
}
