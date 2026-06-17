@echo off
setlocal
cd /d "%~dp0"

set "CRM_PORT=8767"
set "CRM_URL=http://127.0.0.1:%CRM_PORT%/?v=20260617-vinculo-usuario-codigo1"

start "CRM Ionlab - servidor" /D "%~dp0" cmd /k "%~dp0rodar_servidor_crm.bat" %CRM_PORT%

timeout /t 3 /nobreak >nul
start "" "%CRM_URL%"
