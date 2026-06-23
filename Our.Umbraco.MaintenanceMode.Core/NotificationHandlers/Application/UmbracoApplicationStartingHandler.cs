using Umbraco.Cms.Core.Events;
using Umbraco.Cms.Core.Migrations;
using Umbraco.Cms.Core.Notifications;
using Umbraco.Cms.Core.Services;
using Umbraco.Cms.Core;
using Umbraco.Cms.Infrastructure.Migrations.Upgrade;
using Umbraco.Cms.Infrastructure.Migrations;
using Our.Umbraco.MaintenanceMode.Migrations;
using Umbraco.Cms.Infrastructure.Scoping;
using System.Threading.Tasks;
using System.Threading;

namespace Our.Umbraco.MaintenanceMode.NotificationHandlers.Application
{
    public class UmbracoApplicationStartingHandler : INotificationAsyncHandler<UmbracoApplicationStartingNotification>
    {
        private readonly IScopeProvider _scopeProvider;
        private readonly IMigrationPlanExecutor _migrationPlanExecutor;
        private readonly IKeyValueService _keyValueService;
        private readonly IRuntimeState _runtimeState;

        public UmbracoApplicationStartingHandler(IScopeProvider scopeProvider,
            IMigrationPlanExecutor migrationPlanExecutor,
            IKeyValueService keyValueService,
            IRuntimeState runtimeState)
        {
            _scopeProvider = scopeProvider;
            _migrationPlanExecutor = migrationPlanExecutor;
            _keyValueService = keyValueService;
            _runtimeState = runtimeState;
        }

        public async Task HandleAsync(UmbracoApplicationStartingNotification notification, CancellationToken cancellationToken)
        {
            if (_runtimeState.Level < RuntimeLevel.Run) return;

            var plan = new MigrationPlan(MaintenanceMode.PackageAlias);

            plan.From(string.Empty)
                .To<InitialMigration>(InitialMigration.Key);

            var upgrader = new Upgrader(plan);

            await upgrader.ExecuteAsync(_migrationPlanExecutor, _scopeProvider, _keyValueService);
        }
    }
}
