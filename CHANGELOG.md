# Changelog

Notable changes to `Our.Umbraco.MaintenanceMode`. Earlier releases were not tracked in this file;
entries start from here.

## Unreleased

## [18.2.1] - 2026-10-31

### Fixed

- The backoffice client registers as a `backofficeEntryPoint` instead of the deprecated
  `entryPoint`, so the deprecation warning no longer shows in the browser console on every
  backoffice load.
- The cache-busting version on the backoffice entry point is updated, so browsers pick up the new
  client after an upgrade.

### Security

- The dashboard's toggle endpoints (`ToggleMode`, `ToggleFrozen`, `ToggleSiteLock`, `ToggleAccess`)
  changed state on a GET. They are now PUTs that take a JSON body, so a link or an image tag can't
  trigger them for a logged in user.
- Line breaks are stripped from the request path before it is written to the debug log.

## [18.2.0] - 2026-10-26

### Added

- Opt-in anonymous status url, `/umbraco/maintenance/status`, returning only
  `isInMaintenanceMode`, `isContentFrozen` and `isSiteLocked` for monitoring dashboards. Turned on
  with the new **Public status url** option in the dashboard's advanced settings (#66).
- Documentation for the Url and IP whitelists, and for Umbraco Cloud's `/umbraco-signin-oidc` login
  callback. The dashboard descriptions now say both whitelists are comma-separated (#76).

### Fixed

- The unfreeze option's description showed a raw localization key, and the toggle repeated its
  label.

### Changed

- `IPNetwork2` updated from 4.3.0 to 5.0.1 (#115). IP whitelist matching behaves the same.
- Backoffice client dependency updates (vite).

## [18.1.1] - 2026-10-13

### Fixed

- The Maintenance Mode dashboard label is now consistent with other backoffice dashboard
  labels (#79).

### Changed

- Backoffice client dependencies updated: `lit` 3.3, `typescript` 5.9 and `vite` 8 (#105,
  #106, #108).
- Dependabot no longer bumps `@hey-api/*` on its own or moves `typescript` to v6+, since both
  have to line up with `@umbraco-cms/backoffice` (#104).
- CI builds and packs the Core and Client projects explicitly and pushes them as their own
  NuGet packages alongside the main package (#89, #92).

### Repository (#81)

- Repository standards: `LICENSE`, `CHANGELOG.md`, `SECURITY.md`, `CODE_OF_CONDUCT.md`,
  `.editorconfig`, `global.json`, `Directory.Build.props`, `GitVersion.yml`, dependabot, and
  issue and PR templates.
- CI workflows — PR build, package build, release, and CodeQL. The package build runs the
  backoffice client build before packing, so the produced package actually contains the
  `App_Plugins` assets.
- Releases publish to NuGet from a `v{version}` tag pushed on a release branch, gated behind
  the `nuget` GitHub environment and authenticated with trusted publishing (OIDC) rather than
  a stored API key.
- `packages.lock.json` for the shipped projects, so a transitive dependency update can't
  change a build without a commit.

## [18.1.0] - 2026-07-21

### Added

- Lock site: freezes all backoffice editing, not just content and media, with an optional
  `MaintenanceMode:LockPassword` required to unlock (#80).
- Locking and unlocking the site writes a log entry naming the backoffice user who did it.
- Changes to the `MaintenanceMode` appsettings section are picked up without restarting the
  site.

[Unreleased]: https://github.com/Jumoo/Our.Umbraco.MaintenanceMode/compare/v18.2.1...HEAD
[18.2.1]: https://github.com/Jumoo/Our.Umbraco.MaintenanceMode/compare/v18.2.0...v18.2.1
[18.2.0]: https://github.com/Jumoo/Our.Umbraco.MaintenanceMode/compare/v18.1.1...v18.2.0
[18.1.1]: https://github.com/Jumoo/Our.Umbraco.MaintenanceMode/compare/v18.1.0...v18.1.1
[18.1.0]: https://github.com/Jumoo/Our.Umbraco.MaintenanceMode/tree/v18.1.0
