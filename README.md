# Our.Umbraco.MaintenanceMode
Put Umbraco Into Maintenance Mode - While you do things

Simple dashboard to allow you to flick your Umbraco site in and out of Maintenance Mode. 

## Load balanced environments

`Our.Umbraco.MaintenanceMode` supports single web instances immediately after installing. However, when deploying in a load balanced environment additional configuration is required. 

```json
  "MaintenanceMode": {
    "StorageMode": "Database"
  }
```

This will persist the maintenance mode configuration settings to your Umbraco database and read from there in your content delivery instances.

## Repository layout

| Path | What it is |
| --- | --- |
| `Our.Umbraco.MaintenanceMode` | The package project - this is what ships to NuGet |
| `Our.Umbraco.MaintenanceMode.Core` | Settings, storage providers, middleware and the maintenance page view |
| `Our.Umbraco.MaintenanceMode.Client` | The backoffice dashboard (TypeScript, Lit, Vite) under `maintenance-client` |
| `MaintenanceMode.Site.18` | Local test site for Umbraco 18, referenced by `Our.Umbraco.MaintenanceMode.slnx` |
| `dist/buildpackage.ps1` | Local packaging script, for a package you don't want to release |

`MaintenanceMode.Site.16`, `MaintenanceMode.Site.17` and `Our.Umbraco.MaintenanceMode.Assets` are
kept for reference against earlier Umbraco majors and are not part of the current solution.

## Building

Requires the .NET SDK pinned in [`global.json`](global.json) and Node 24.

The backoffice client has to be built first - it produces `wwwroot/App_Plugins`, which is
gitignored, so a fresh clone has no dashboard assets until you do:

```bash
npm ci --prefix Our.Umbraco.MaintenanceMode.Client/maintenance-client
```

```bash
npm run build --prefix Our.Umbraco.MaintenanceMode.Client/maintenance-client
```

Then the package itself:

```bash
dotnet build Our.Umbraco.MaintenanceMode/Our.Umbraco.MaintenanceMode.csproj -c Release
```

Shared build and package metadata lives in [`Directory.Build.props`](Directory.Build.props).
Restores are locked, so if you change a dependency you have to commit the regenerated lock file
alongside it:

```bash
dotnet restore Our.Umbraco.MaintenanceMode/Our.Umbraco.MaintenanceMode.csproj --force-evaluate
```

## Releasing

Pushing a `v{version}` tag on a release branch (`v18/main`, `v17/main`, ...) publishes to NuGet:

```bash
git tag v18.1.0 && git push origin v18.1.0
```

The tag is the version - `v18.1.0` publishes `18.1.0`. The workflow refuses to run if the tag
isn't a valid version, or if the tagged commit isn't on a release branch.

Authentication is [trusted publishing](https://learn.microsoft.com/en-us/nuget/nuget-org/trusted-publishing) -
the job exchanges a GitHub OIDC token for a short-lived NuGet key, so there is no API key stored
in the repository.

Every push to a release branch also builds a package and uploads it as a build artifact, so a
release candidate can be tested without publishing anything.

## Contributing

Please read [SECURITY.md](SECURITY.md) before reporting anything security related.

## Licence

[MIT](LICENSE).