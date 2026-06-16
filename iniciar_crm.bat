@echo off
setlocal
cd /d "%~dp0"

set "CODEX_PY=C:\Users\comer\.cache\codex-runtimes\codex-primary-runtime\dependencies\python\python.exe"
set "CRM_PORT=%~1"
if "%CRM_PORT%"=="" set "CRM_PORT=8765"

if exist "%CODEX_PY%" (
  "%CODEX_PY%" server.py %CRM_PORT%
) else (
  python server.py %CRM_PORT%
)
