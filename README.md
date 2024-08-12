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