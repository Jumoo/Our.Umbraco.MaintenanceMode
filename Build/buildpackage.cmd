@ECHO OFF
REM build the umbraco package 
REM
REM usage BuildPackage (version)
REM
REM example
REM		BuildPackage 2.0.2 
REM


CALL UmbPackage package.xml %1
CALL "%ProgramFiles%\7-Zip\7z.exe" a .\%1\MaintenanceMode_%1.zip ".\%1\Maintenance Mode V8_%1\*.*" 
CALL RD ".\%1\Maintenance Mode V8_%1\" /s /q
