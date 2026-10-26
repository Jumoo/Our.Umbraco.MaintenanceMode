# Our.Umbraco.MaintenanceMode

Put Umbraco Into Maintenance Mode - While you do things with a simple dashboard to allow you to flick your Umbraco site in and out of Maintenance Mode.

## Features

- Replace all pages on your site with a maintenance page
- Allow users who are logged into the Umbraco backoffice to still see the site
- Apply a content freeze so no authors can update or change any content
- Lock the site with a password to prevent unauthorized changes

## Configuration

You can configure maintenance mode settings in your `appsettings.json` file:

```json
{
  "MaintenanceMode": {
    "IsInMaintenanceMode": false,
    "IsContentFrozen": false,
    "IsSiteLocked": false,
    "LockPassword": "your-secure-password",
    "StorageMode": "Auto",
    "WaitTimeBetweenDatabaseCalls": 30
  }
}
```

### Configuration Options

- **IsInMaintenanceMode** - When true, displays the maintenance page to all non-backoffice users
- **IsContentFrozen** - When true, prevents content authors from making changes to content
- **IsSiteLocked** - When true, locks the site completely (even for backoffice users)
- **LockPassword** - Optional password to protect the site lock feature. When set:
  - The site will automatically lock on startup
  - Unlocking the site requires entering this password in the dashboard
  - Locking the site does not require a password
- **StorageMode** - Storage mode for maintenance state (Auto, FileSystem, or Database)
- **WaitTimeBetweenDatabaseCalls** - Seconds to wait between database polling (when using Database storage mode)

### Dashboard Settings

These are set from **Advanced options** on the Maintenance Mode dashboard, and are stored with the
maintenance state (so with `StorageMode` set to `Database` they apply across all instances).

- **Url Whitelist** - comma-separated paths that skip the maintenance page, e.g. `/health,/robots`.
  Each path must match the request path exactly (leading/trailing slashes are ignored, sub-paths are
  not included).
- **IP Whitelist** - comma-separated IP addresses or CIDR ranges that skip the maintenance page,
  e.g. `203.0.113.7,10.0.0.0/24`.
- **Public status url** - see [Public Status Url](#public-status-url) below.

Some paths are always allowed and never need whitelisting: anything under `/umbraco`, `/App_Plugins`,
`/api`, `/media` and `/install`, any path containing a `.` (static files), and `/umbraco-signin-oidc`.

#### Umbraco Cloud and external logins

Umbraco Cloud (and any other OpenID Connect back office login) returns to the site on
`/umbraco-signin-oidc` after you sign in. That path is allowed automatically from v17.1.1. On
earlier versions, or if your login provider uses a different callback path, add it to the
**Url Whitelist** - otherwise the login callback gets the maintenance page and the back office
login fails (often as a 400 or 500 error), locking you out:

```
/umbraco-signin-oidc
```

### Public Status Url

For monitoring dashboards that track many sites, maintenance mode can expose its state on an
anonymous url. It is **off by default**; turn on **Public status url** in Advanced options, then:

```
GET /umbraco/maintenance/status
```

```json
{
  "isInMaintenanceMode": false,
  "isContentFrozen": true,
  "isSiteLocked": false
}
```

Only these three flags are returned - no settings, whitelists or passwords. When the option is
off the url returns `404`.

### Password-Protected Site Lock

The `LockPassword` setting provides additional security for the site lock feature:

1. **Setting a password**: Add `"LockPassword": "your-secure-password"` to your `MaintenanceMode` configuration section
2. **Auto-lock on startup**: When a password is configured, the site will automatically lock when the application starts
3. **Unlocking**: To unlock the site, navigate to the Maintenance Mode dashboard and click the "Lock Site" button. You will be prompted to enter the password
4. **Locking**: Locking the site does not require a password - this is to allow quick emergency locks

**Important**: The password is stored in plain text in your configuration, so treat it as a shared secret and use appropriate security measures (user secrets, Azure Key Vault, environment variables, etc.) in production environments.
