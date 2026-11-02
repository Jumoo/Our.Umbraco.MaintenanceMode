import { UmbEntryPointOnInit } from "@umbraco-cms/backoffice/extension-api";

// load up the manifests here.
import { manifests as dashboardManifests } from "./dashboards/manifest.ts";
import { manifests as contextManifests } from "./contexts/manifests.ts";
import { manifests as langManifests } from "./lang/manifest.ts";
import { manifests as settingManifests } from "./settings/manifests.ts";
import { manifests as modalManifests } from "./modals/manifests.ts";
import { UMB_AUTH_CONTEXT } from "@umbraco-cms/backoffice/auth";
import { client } from "./api/index.ts";

const manifests: Array<UmbExtensionManifest> = [
  ...dashboardManifests,
  ...contextManifests,
  ...langManifests,
  ...settingManifests,
  ...modalManifests,
];

export const onInit: UmbEntryPointOnInit = async (host, extensionRegistry) => {
  // Configure the API client before registering anything that uses it, so the
  // first request is already authenticated. configureClient() sets baseUrl and
  // credentials, attaches the auth callback and binds the default interceptors
  // (401 retry, error notifications).
  const authContext = await host.getContext(UMB_AUTH_CONTEXT);
  if (authContext) {
    authContext.configureClient(client);
  } else {
    console.warn(
      "UMB_AUTH_CONTEXT not available — extension API client will not be authenticated",
    );
  }

  extensionRegistry.registerMany(manifests);
};
