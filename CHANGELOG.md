# Changelog

Notable changes to `Our.Umbraco.MaintenanceMode`. Earlier releases were not tracked in this file;
entries start from here.

## Unreleased

### Added

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

[Unreleased]: https://github.com/Jumoo/Our.Umbraco.MaintenanceMode/compare/v16.0.0...HEAD
