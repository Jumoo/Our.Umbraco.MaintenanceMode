using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Our.Umbraco.MaintenanceMode
{
    internal static class MaintenanceMode
    {
        /// <summary>
        ///  route use for maintenance requests (random name so as not to clash)
        /// </summary>
        public const string MaintenanceRoot = "e7f7581c6bcd4113954e163ff18cbaba";

        public const string PackageAlias = "Our.Umbraco.MaintenanceMode";

        /// <summary>
        /// Identifier for accessing record in the DB, currently only setting this at global level (-1) is supported 
        /// </summary>
        public const int MaintenanceConfigRootId = -1;
    }
}
