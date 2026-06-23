import { UmbEntryPointOnInit } from "@umbraco-cms/backoffice/extension-api";

// load up the manifests here.
import { manifests as dashboardManifests } from "./dashboards/manifest.ts";
import { manifests as contextManifests } from "./contexts/manifests.ts";
import { manifests as langManifests } from "./lang/manifest.ts";
import { manifests as settingManifests } from "./settings/manifests.ts";
import { UMB_AUTH_CONTEXT } from "@umbraco-cms/backoffice/auth";
import { client } from "./api/client.gen.ts";

const manifests: Array<UmbExtensionManifest> = [
  ...dashboardManifests,
  ...contextManifests,
  ...langManifests,
  ...settingManifests,
];

export const onInit: UmbEntryPointOnInit = async (host, extensionRegistry) => {
  // register them here.
  extensionRegistry.registerMany(manifests);

  // Wire the generated API client into the backoffice auth context.
  // configureClient() sets baseUrl + credentials, attaches the auth callback
  // (cookie-based, with automatic token refresh) and binds the default
  // response interceptors (401 retry, error notifications, etc.).
  // The framework awaits onInit, so resolving the context here ensures the
  // client is fully configured before any element in this extension can use it.
  const authContext = await host.getContext(UMB_AUTH_CONTEXT);
  if (!authContext) {
    console.warn(
      "UMB_AUTH_CONTEXT not available — extension API client will not be authenticated",
    );
    return;
  }
  authContext.configureClient(client);
};
