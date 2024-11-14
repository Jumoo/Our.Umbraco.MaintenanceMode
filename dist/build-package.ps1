<#
SYNOPSIS
    Builds and optionally pushes the packages.
#>
param (

    [Parameter(Mandatory)]
    [string]
    [Alias("v")]  $version, #version to build

    [Parameter()]
    [string]
    $suffix, # optional suffix to append to version (for pre-releases)

    [Parameter()]
    [string]
    $env = 'release', #build environment to use when packing

    [Parameter()]
    [switch]
    $push=$false #push to devops nightly feed
)

# define the packages you want to build 
# (we assume folder and package name are the same)
$packages = @(
  "MaintenanceManager.Client",
  "Our.Umbraco.MaintenanceMode",
  "Umbraco.Community.MaintenanceMode"
);

$primary = "Umbraco.Community.MaintenanceMode"

$assetsPath = '../MaintenanceManager.Client/assets'
$npmCmd = 'build'

# - - - - - - - - generic from here - - - - - - - - -

if ($version.IndexOf('-') -ne -1) {
    Write-Host "Version shouldn't contain a - (remember version and suffix are seperate)"
    exit
}

$fullVersion = $version;

if (![string]::IsNullOrWhiteSpace($suffix)) {
   $fullVersion = -join($version, '-', $suffix)
}

$majorFolder = $version.Substring(0, $version.LastIndexOf('.'))

$outFolder = ".\$majorFolder\$version\$fullVersion"
if (![string]::IsNullOrWhiteSpace($suffix)) {
    $suffixFolder = $suffix;
    if ($suffix.IndexOf('.') -ne -1) {
        $suffixFolder = $suffix.substring(0, $suffix.indexOf('.'))
    }
    $outFolder = ".\$majorFolder\$version\$version-$suffixFolder\$fullVersion"
}

"----------------------------------"
Write-Host "Version  :" $fullVersion
Write-Host "Config   :" $env
Write-Host "Folder   :" $outFolder
"----------------------------------"; ""

$buildParams = "ContinuousIntegrationBuild=true,version=$fullVersion"

""; "##### NPM Package creation"; "----------------------------------" ; ""

Set-Location $assetsPath
# npm version $fullVersion
# npm run all:make
npm run $npmCmd 
Set-Location ../../dist

""; "##### Packaging"; "----------------------------------" ; ""

foreach($package in $packages) {
  "## Packing $package";
  dotnet pack "..\$package\$package.csproj" --no-restore -c $env -o $outFolder /p:$buildParams
}

""; "##### Copying to LocalGit folder"; "----------------------------------" ; ""
XCOPY "$outFolder\*.nupkg" "C:\Source\localgit" /Q /Y 

if ($push) {
    ""; "##### Pushing to our nighly package feed"; "----------------------------------" ; ""
    &nuget.exe push "$outFolder\*.nupkg" -ApiKey AzureDevOps -src https://pkgs.dev.azure.com/jumoo/Public/_packaging/nightly/nuget/v3/index.json
}

Remove-Item ".\last-build-*"
Out-File ".\last-build-$fullVersion.txt" -InputObject $fullVersion
Write-Host "Packaged : $fullVersion"

Set-Clipboard -Value "dotnet add package $primary --version $fullVersion"
Write-Host "Dotnet command in clipboard";


[Console]::Beep(2048,500);