# Security Policy

## Supported versions

`Our.Umbraco.MaintenanceMode` ships one release line per Umbraco major.

| Version | Branch | Supported |
| --- | --- | --- |
| 18.x | `v18/main` | Yes |
| 17.x | `v17/main` | Yes |
| 16.x and earlier | — | No |

## Reporting a vulnerability

Please **do not** open a public issue for a security problem.

Email **kevin@jumoo.co.uk** with a description of the issue, the version affected, and steps to
reproduce it. We'll acknowledge within a few working days and keep you updated as we work on it.

This package can lock a site behind a password (`LockPassword`) and persists maintenance state
to the file system or database, so if the issue involves that password, session/access checks
around the maintenance page, or the stored state, say so — those get sequenced first.
