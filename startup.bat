@echo off
setlocal EnableDelayedExpansion

REM FitBash one-shot launcher: install (if needed), migrate DB, build, run, open browser.

cd /d "%~dp0"

where node >nul 2>nul
if errorlevel 1 (
  echo Error: Node.js is not on PATH. Install Node 22 LTS from https://nodejs.org and retry.
  exit /b 1
)

if not exist node_modules (
  echo Installing dependencies...
  call npm install
  if errorlevel 1 exit /b 1
)

echo Applying database migrations...
call npx --yes prisma migrate deploy
if errorlevel 1 exit /b 1

echo Building production bundle...
call npm run build
if errorlevel 1 exit /b 1

REM Open the browser ~3 seconds after the server starts (gives next start time to bind).
start "" /B cmd /c "timeout /t 3 /nobreak >nul && start http://localhost:3000"

echo Starting server on http://localhost:3000  (Ctrl+C to stop)
call npm start
