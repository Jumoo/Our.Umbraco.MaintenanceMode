import { UmbEntryPointOnInit } from "@umbraco-cms/backoffice/extension-api";

// load up the manifests here.
import { manifests as dashboardManifests } from "./dashboards/manifest.ts";
import { manifests as contextManifests } from "./contexts/manifests.ts";
import { manifests as langManifests } from "./lang/manifest.ts";
import { manifests as settingManifests } from "./settings/manifests.ts";
import { UMB_AUTH_CONTEXT } from "@umbraco-cms/backoffice/auth";
import { client } from "./api/index.ts";

const manifests: Array<UmbExtensionManifest> = [
  ...dashboardManifests,
  ...contextManifests,
  ...langManifests,
  ...settingManifests,
];

export const onInit: UmbEntryPointOnInit = (_host, extensionRegistry) => {
  // register them here.
  extensionRegistry.registerMany(manifests);
  _host.consumeContext(UMB_AUTH_CONTEXT, (_auth) => {
    if (!_auth) return;
    const config = _auth.getOpenApiConfiguration();

    client.setConfig({
      baseUrl: config.base,
      credentials: config.credentials,
    });

    client.interceptors.request.use(async (request, _options) => {
      const token = await _auth.getLatestToken();
      request.headers.set("Authorization", `Bearer ${token}`);
      return request;
    });
  });
};
