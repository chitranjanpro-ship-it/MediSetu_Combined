@echo off
title MediSetu - Update Navigation Script
color 0B
cls

echo.
echo ================================================
echo   MEDISETU - UPDATE NAVIGATION TO VERSION 3
echo ================================================
echo.
echo This will update all HTML pages with
echo Combined Navigation (11 links).
echo.
echo Press any key to continue...
pause >nul

cd /d "%~dp0\Combined_Pages"

echo.
echo Updating navigation in HTML files...
echo.

REM This is a placeholder - actual navigation update needs to be done
REM by reading each file and replacing the nav section
echo [INFO] Navigation update requires manual file editing.
echo.
echo Please use the navigation template from:
echo Navigation_Versions\Templates\nav_version3_combined.html
echo.
echo Or run the PowerShell script: UPDATE_NAVIGATION.ps1
echo.

pause

