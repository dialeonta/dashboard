@echo off
title Sincronizando Datos Offline - Quality Dashboard 2.0
cd /d "%~dp0"

echo ==================================================
echo       SINCRONIZANDO DATOS OFFLINE
echo ==================================================
echo.

:: Verificar si Node.js está instalado en el sistema
where node >nul 2>nul
if %errorlevel% neq 0 (
    echo [ERROR] Node.js no esta instalado en este sistema.
    echo Se requiere Node.js para poder leer los archivos CSV y JSON
    echo y compilar el archivo public\default_data.js.
    echo.
    echo Por favor, instale Node.js o ejecute la aplicacion en modo
    echo online una vez para sincronizar automaticamente los datos.
    echo.
    pause
    exit /b
)

:: Ejecutar sincronización usando el script independiente sin dependencias
echo [INFO] Generando public\default_data.js...
node sync_default_data.js

if %errorlevel% equ 0 (
    echo.
    echo [SUCCESS] Sincronizacion completada con exito.
    echo El archivo public\default_data.js ha sido actualizado con los
    echo ultimos datos de la carpeta 'data'.
) else (
    echo.
    echo [ERROR] Ocurrio un error al intentar sincronizar los datos.
)
echo.
pause
