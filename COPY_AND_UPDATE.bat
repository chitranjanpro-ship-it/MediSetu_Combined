@echo off
title MediSetu - Copy and Update Script
color 0A
cls

echo.
echo ================================================
echo   MEDISETU - AUTOMATED COPY AND UPDATE
echo ================================================
echo.
echo This script will:
echo 1. Copy CSS and JS folders
echo 2. Copy all HTML pages
echo 3. Update navigation to Combined Version (11 links)
echo.
echo Press any key to continue...
pause >nul

cd /d "%~dp0"

REM Set paths
set "SOURCE=..\MediSetu_Web_Prototype"
set "DEST=Combined_Pages"

echo.
echo [1/3] Copying CSS folder...
if exist "%SOURCE%\css" (
    xcopy "%SOURCE%\css" "%DEST%\css\" /E /I /Y >nul 2>&1
    if %errorlevel% == 0 (
        echo [OK] CSS folder copied
    ) else (
        echo [ERROR] Failed to copy CSS
    )
) else (
    echo [WARNING] CSS folder not found
)

echo.
echo [2/3] Copying JS folder...
if exist "%SOURCE%\js" (
    xcopy "%SOURCE%\js" "%DEST%\js\" /E /I /Y >nul 2>&1
    if %errorlevel% == 0 (
        echo [OK] JS folder copied
    ) else (
        echo [ERROR] Failed to copy JS
    )
) else (
    echo [WARNING] JS folder not found
)

echo.
echo [3/3] Copying HTML pages...
echo.

REM List of HTML files to copy (excluding helper files)
set FILES=about.html register.html login.html contact.html partner.html customer.html doctor.html vendor.html delivery.html logistics.html help.html adSubmit.html adminAds.html

for %%f in (%FILES%) do (
    if exist "%SOURCE%\%%f" (
        copy "%SOURCE%\%%f" "%DEST%\%%f" >nul 2>&1
        if %errorlevel% == 0 (
            echo [OK] Copied %%f
        ) else (
            echo [ERROR] Failed to copy %%f
        )
    ) else (
        echo [WARNING] %%f not found
    )
)

echo.
echo ================================================
echo   Copy completed!
echo ================================================
echo.
echo Next: Run UPDATE_NAVIGATION.bat to update
echo       all pages with combined navigation.
echo.
pause

