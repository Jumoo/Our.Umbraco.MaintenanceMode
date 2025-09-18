import { defineConfig } from "@hey-api/openapi-ts";
import { defaultPlugins } from "@hey-api/openapi-ts";

export default defineConfig({
  input: "http://localhost:24368/umbraco/swagger/maintenance/swagger.json",
  output: {
    format: "prettier",
    path: "src/api",
  },
  plugins: [
    ...defaultPlugins,
    {
      name: "@hey-api/client-fetch",
      exportFromIndex: true,
      throwOnError: true,
    },
    {
      name: "@hey-api/typescript",
      enums: "typescript",
      readOnlyWriteOnlyBehavior: "off",
    },
    {
      name: "@hey-api/sdk",
      asClass: true,
    },
  ],
});
