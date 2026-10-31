# Changelog

Notable changes to `Our.Umbraco.MaintenanceMode`. Earlier releases were not tracked in this file;
entries start from here.

## Unreleased

### Fixed

- The backoffice client registers as a `backofficeEntryPoint` instead of the deprecated
  `entryPoint`, so the deprecation warning no longer shows in the browser console on every
  backoffice load.

### Security

- The dashboard's toggle endpoints (`ToggleMode`, `ToggleFrozen`, `ToggleSiteLock`, `ToggleAccess`)
  changed state on a GET. They are now POSTs that take a JSON body, so a link or an image tag can't
  trigger them for a logged in user.
- Line breaks are stripped from the request path before it is written to the debug log.

## [17.2.0] - 2026-10-26

### Added

- Opt-in anonymous status url, `/umbraco/maintenance/status`, returning only
  `isInMaintenanceMode`, `isContentFrozen` and `isSiteLocked` for monitoring dashboards. Turned on
  with the new **Public status url** option in the dashboard's advanced settings (#66).
- Documentation for the Url and IP whitelists, and for Umbraco Cloud's `/umbraco-signin-oidc` login
  callback. The dashboard descriptions now say both whitelists are comma-separated (#76).

### Fixed

- The Maintenance Mode dashboard label is now consistent with other backoffice dashboard
  labels (#79).
- The unfreeze option's description showed a raw localization key, and the toggle repeated its
  label.

### Changed

- `IPNetwork2` updated from 3.6.0 to 5.0.1 (#115). IP whitelist matching behaves the same.
- Backoffice client dependency updates (vite, markdown-it, prosemirror-view and the
  npm-dependencies group). Dependabot no longer moves `typescript` to v6+ or bumps `@hey-api/*`.

## [17.1.4] - 2026-08-25

### Repository

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

[Unreleased]: https://github.com/Jumoo/Our.Umbraco.MaintenanceMode/compare/v17.2.0...HEAD
[17.2.0]: https://github.com/Jumoo/Our.Umbraco.MaintenanceMode/compare/v17.1.4...v17.2.0
