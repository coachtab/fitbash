#!/usr/bin/env bash
# FitBash one-shot launcher: install (if needed), migrate DB, build, run, open browser.
# Works on macOS and Linux.

set -euo pipefail

cd "$(dirname "$0")"

if ! command -v node >/dev/null 2>&1; then
  echo "Error: Node.js is not on PATH. Install Node 22 LTS from https://nodejs.org and retry." >&2
  exit 1
fi

if [ ! -d node_modules ]; then
  echo "Installing dependencies..."
  npm install
fi

echo "Applying database migrations..."
npx --yes prisma migrate deploy

echo "Building production bundle..."
npm run build

# Pick the right URL opener for the host OS
case "$(uname -s)" in
  Darwin)            opener="open" ;;
  Linux|*BSD|GNU*)   opener="xdg-open" ;;
  MINGW*|MSYS*|CYGWIN*) opener="start" ;;
  *)                 opener="" ;;
esac

URL="http://localhost:3000"

if [ -n "$opener" ] && command -v "$opener" >/dev/null 2>&1; then
  # Open the browser ~3 seconds after the server starts (gives next start time to bind).
  ( sleep 3 && "$opener" "$URL" >/dev/null 2>&1 || true ) &
else
  echo "Could not detect a browser opener for this OS — visit $URL manually."
fi

echo "Starting server on $URL  (Ctrl+C to stop)"
exec npm start
