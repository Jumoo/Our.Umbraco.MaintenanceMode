using Microsoft.Extensions.Options;
using Our.Umbraco.MaintenanceMode.Configurations;
using Our.Umbraco.MaintenanceMode.Models.Schema;
using Umbraco.Cms.Infrastructure.Migrations;

namespace Our.Umbraco.MaintenanceMode.Migrations
{
    public sealed class InitialMigration : MigrationBase
    {
        public const string Key = "maintenance-mode-init";

        private readonly MaintenanceModeSettings _maintenanceModeSettings;

        public InitialMigration(
            IMigrationContext context,
            IOptions<MaintenanceModeSettings> maintenanceModeSettings
        ) : base(context) 
        {
        }

        protected override void Migrate()
        {
            if (!TableExists(nameof(MaintenanceModeSchema)))
            {
                Create.Table<MaintenanceModeSchema>().Do();
            }
        }
    }
}
