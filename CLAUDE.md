# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this is

`Our.Umbraco.MaintenanceMode` is a standalone Umbraco package - it puts a site into maintenance
mode (a splash page for visitors), optionally freezes content editing, and can lock the site
completely, all controlled from a backoffice dashboard. Unlike a connector, it needs nothing
else installed.

Three halves: `Our.Umbraco.MaintenanceMode.Core` (settings, storage, middleware, the maintenance
page view), `Our.Umbraco.MaintenanceMode.Client` (the backoffice dashboard - TypeScript, Lit,
Vite - under `maintenance-client`), and `Our.Umbraco.MaintenanceMode` (the package project that
references both and is what ships to NuGet).

## Commands

The client has to be built before the package - it produces `wwwroot/App_Plugins`, which is
gitignored, so a fresh clone has no dashboard assets until you build it.

```bash
npm ci --prefix Our.Umbraco.MaintenanceMode.Client/maintenance-client
```

```bash
npm run build --prefix Our.Umbraco.MaintenanceMode.Client/maintenance-client
```

```bash
dotnet build Our.Umbraco.MaintenanceMode/Our.Umbraco.MaintenanceMode.csproj -c Release
```

Typecheck only, which is much faster than a full vite build when iterating:

```bash
npx tsc --noEmit --project Our.Umbraco.MaintenanceMode.Client/maintenance-client
```

There is no `format` script in the client and no test project. Verification is: dotnet build
clean, `tsc` clean, `vite build` clean - and for anything user facing, a click-through in a
running backoffice (`MaintenanceMode.Site.18`).

## Repository shape

**Branches are per Umbraco major** - `v18/main` is the current release line. Workflow filters
use `[ "main", "*/main" ]` and GitVersion uses `^(v[0-9]+\/)?main$`, so both forms work and the
next major needs no CI change.

**Build the package project, never the solution, for anything CI-equivalent.**
`Our.Umbraco.MaintenanceMode.slnx` references `MaintenanceMode.Site.18` as a local test site;
`MaintenanceMode.Site.16`, `.17` and `Our.Umbraco.MaintenanceMode.Assets` are tracked for
reference against older Umbraco majors but are not in the current solution and are not built by
CI.

Adding `Directory.Build.props` here stops any Directory.Build.props further up the disk from
applying - if one exists there and sets `NuGetAuditMode`, that setting has to be repeated here so
local and CI builds agree.

## Settings - the thing to get right

Every setting lives on `MaintenanceModeSettings`
(`Our.Umbraco.MaintenanceMode.Core/Configurations/MaintenanceModeSettings.cs`): the C# property,
its default, and the `MaintenanceMode` config section key it binds to.

**A setting exists in three places that must agree:**

1. the property on `MaintenanceModeSettings`
2. its entry in `appsettings-schema.json` (there are copies of this schema in each project -
   `Our.Umbraco.MaintenanceMode`, `.Core` and `.Client` - keep them in sync)
3. the corresponding control in the backoffice dashboard, under
   `Our.Umbraco.MaintenanceMode.Client/maintenance-client/src`

`StorageMode` (`Auto`, `FileSystem`, `Database`) picks how state is persisted -
`FileSystemStorageProvider` vs `DatabaseStorageProvider`, chosen by `StorageProviderFactory`.
Load balanced setups need `Database`, since file system state doesn't propagate across
instances - see the README section on this before changing provider selection logic.

**`LockPassword` is stored in plain text in configuration.** It is documented as such in the
package readme; don't add anything that logs, echoes, or otherwise surfaces it beyond the
existing lock/unlock flow.

## Things that will catch you out

**Version numbers** come from `Directory.Build.props` (`VersionPrefix`) and `GitVersion.yml`, and
CI stamps the built version via `dotnet pack /p:version=`. Don't hardcode versions in the csproj.

**Restores are locked** (`RestorePackagesWithLockFile` in `Directory.Build.props`). If you change
a dependency in any of the three shipped projects, run
`dotnet restore <csproj> --force-evaluate` and commit the regenerated `packages.lock.json`
alongside it - CI restores with `--locked-mode` and fails if it's stale.

**`wwwroot/App_Plugins` under the Client project is gitignored and generated.** It doesn't exist
on a clean checkout until the client is built - CI always builds the client before restoring or
building the .NET side, and so should you.
