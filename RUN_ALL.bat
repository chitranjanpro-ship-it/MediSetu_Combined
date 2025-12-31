@echo off
title MediSetu - Complete Automation
color 0A
cls

echo.
echo ================================================
echo   MEDISETU - COMPLETE AUTOMATION SCRIPT
echo ================================================
echo.
echo This will:
echo 1. Copy CSS and JS folders
echo 2. Copy all HTML pages
echo 3. Update all pages with Combined Navigation
echo.
echo Press any key to start...
pause >nul

cd /d "%~dp0"

echo.
echo ================================================
echo   STEP 1: Copying Files
echo ================================================
echo.

REM Copy CSS
if exist "..\MediSetu_Web_Prototype\css" (
    echo Copying CSS folder...
    xcopy "..\MediSetu_Web_Prototype\css" "Combined_Pages\css\" /E /I /Y >nul 2>&1
    echo [OK] CSS copied
) else (
    echo [WARNING] CSS folder not found
)

REM Copy JS
if exist "..\MediSetu_Web_Prototype\js" (
    echo Copying JS folder...
    xcopy "..\MediSetu_Web_Prototype\js" "Combined_Pages\js\" /E /I /Y >nul 2>&1
    echo [OK] JS copied
) else (
    echo [WARNING] JS folder not found
)

REM Copy HTML files
echo.
echo Copying HTML pages...
set FILES=about.html register.html login.html contact.html partner.html customer.html doctor.html vendor.html delivery.html logistics.html help.html adSubmit.html adminAds.html

for %%f in (%FILES%) do (
    if exist "..\MediSetu_Web_Prototype\%%f" (
        copy "..\MediSetu_Web_Prototype\%%f" "Combined_Pages\%%f" >nul 2>&1
        echo [OK] Copied %%f
    )
)

echo.
echo ================================================
echo   STEP 2: Updating Navigation
echo ================================================
echo.

REM Run PowerShell script to update navigation
powershell -ExecutionPolicy Bypass -File "UPDATE_NAVIGATION.ps1"

echo.
echo ================================================
echo   COMPLETE!
echo ================================================
echo.
echo All files copied and navigation updated!
echo Check Combined_Pages folder for results.
echo.
pause

