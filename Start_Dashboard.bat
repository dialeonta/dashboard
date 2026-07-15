@echo off
title Starting Quality Dashboard 2.0
cd /d "%~dp0"

echo ==================================================
echo       STARTING QUALITY DASHBOARD 2.0
echo ==================================================
echo.

:: Verify if Node.js is installed on the system
where node >nul 2>nul
if %errorlevel% neq 0 (
    echo [WARNING] Node.js is not installed on this system.
    echo Express server cannot be started.
    echo.
    echo Running in STATIC OFFLINE MODE...
    echo Data will be saved in your browser's local storage.
    echo.
    :: Open index.html directly from local directory
    start "" "public\index.html"
    pause
    exit /b
)

:: If node_modules directory does not exist, run npm install to set up dependencies
if not exist "node_modules\" (
    echo [INFO] Installing Node.js dependencies (this may take a few seconds)...
    call npm install
    if %errorlevel% neq 0 (
        echo [ERROR] Could not install dependencies.
        echo Falling back to STATIC OFFLINE MODE...
        start "" "public\index.html"
        pause
        exit /b
    )
)

:: Open the default browser to access the server localhost address
echo [INFO] Starting local Express server...
start "" "http://localhost:3000"

:: Start the application server execution process
npm start
pause
