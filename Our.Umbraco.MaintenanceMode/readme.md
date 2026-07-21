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

### Password-Protected Site Lock

The `LockPassword` setting provides additional security for the site lock feature:

1. **Setting a password**: Add `"LockPassword": "your-secure-password"` to your `MaintenanceMode` configuration section
2. **Auto-lock on startup**: When a password is configured, the site will automatically lock when the application starts
3. **Unlocking**: To unlock the site, navigate to the Maintenance Mode dashboard and click the "Lock Site" button. You will be prompted to enter the password
4. **Locking**: Locking the site does not require a password - this is to allow quick emergency locks

**Important**: The password is stored in plain text in your configuration, so treat it as a shared secret and use appropriate security measures (user secrets, Azure Key Vault, environment variables, etc.) in production environments.
