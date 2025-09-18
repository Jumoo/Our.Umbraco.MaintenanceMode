<#
SYNOPSIS
    Builds the optionally pushes the packages to the azure feed
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

$package = "Our.Umbraco.MaintenanceMode"
$projPath = "..\$package\$package.csproj";


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

$buildParams = "ContinuousIntegrationBuild=true,version=$fullVersion"

"----------------------------------"
Write-Host "Version  :" $fullVersion
Write-Host "Config   :" $env
Write-Host "Folder   :" $outFolder
"----------------------------------"; ""

dotnet restore ..

  $packages = @(
    "Our.Umbraco.MaintenanceMode"
    "Our.Umbraco.MaintenanceMode.Core"
    "Our.Umbraco.MaintenanceMode.Assets"
    "Our.Umbraco.MaintenanceMode.Client"
  )


foreach($p in $packages) {
	"## Packing $p";
	dotnet pack "..\$p\$p.csproj" -c $env -o $outFolder --no-restore /p:$buildParams 
}

""; "##### Copying to LocalGit folder"; "----------------------------------" ; ""
XCOPY "$outFolder\*.nupkg" "C:\Source\localgit" /Q /Y 

if ($push) {
    ""; "##### Pushing to our nighly package feed"; "----------------------------------" ; ""
    .\nuget.exe push "$outFolder\*.nupkg" -ApiKey JumooNightly -src https://pkgs.dev.azure.com/jumoo/Public/_packaging/nightly/nuget/v3/index.json
    
    Remove-Item ".\last-push-*" 
    Out-File -FilePath ".\last-push-$fullVersion.txt" -InputObject $fullVersion
}

Write-Host "Packaged : $fullVersion"

Remove-Item ".\last-build-*" 
Out-File -FilePath ".\last-build-$fullVersion.txt" -InputObject $fullVersion

Set-Clipboard -Value "dotnet add package $package --version $fullVersion"
Write-Host "Dotnet command in clipboard";


[Console]::Beep(2048,500);