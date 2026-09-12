#!/usr/bin/env bash
set -Eeuo pipefail

APP_DIR="${APP_DIR:-$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)}"
CLIENT_DIR="$APP_DIR/client"
SERVER_DIR="$APP_DIR/server"
SERVICE_NAME="${SERVICE_NAME:-dr-shaimaa-dentist-backend.service}"
APP_USER="${APP_USER:-www-data}"
APP_GROUP="${APP_GROUP:-www-data}"
PORT="${PORT:-5000}"
HEALTH_URL="${HEALTH_URL:-http://127.0.0.1:${PORT}/api/health}"
LOCK_FILE="${LOCK_FILE:-/tmp/dr-shaimaa-dentist-deploy.lock}"

fail() {
  printf 'Deployment failed: %s\n' "$1" >&2
  exit 1
}

for command_name in node npm curl systemctl flock; do
  command -v "$command_name" >/dev/null 2>&1 || fail "$command_name is not installed"
done

[[ -f "$CLIENT_DIR/package-lock.json" ]] || fail "client/package-lock.json is missing"
[[ -f "$SERVER_DIR/package-lock.json" ]] || fail "server/package-lock.json is missing"
[[ -f "$SERVER_DIR/.env" ]] || fail "server/.env is missing"
grep -Eq '^NODE_ENV=production$' "$SERVER_DIR/.env" || fail "NODE_ENV=production is required in server/.env"

exec 9>"$LOCK_FILE"
flock -n 9 || fail "another deployment is already running"

printf 'Installing client dependencies...\n'
npm ci --prefix "$CLIENT_DIR" --no-audit --no-fund
npm run build --prefix "$CLIENT_DIR"

printf 'Installing server dependencies...\n'
npm ci --prefix "$SERVER_DIR" --omit=dev --no-audit --no-fund
mkdir -p "$SERVER_DIR/uploads"
chown -R "$APP_USER:$APP_GROUP" "$SERVER_DIR/uploads"

printf 'Restarting %s...\n' "$SERVICE_NAME"
systemctl restart "$SERVICE_NAME"

for attempt in $(seq 1 20); do
  if curl -fsS --max-time 5 "$HEALTH_URL" >/dev/null; then
    if command -v nginx >/dev/null 2>&1; then
      nginx -t
      systemctl reload nginx
    fi
    printf 'Deployment complete. Health check passed at %s\n' "$HEALTH_URL"
    exit 0
  fi
  sleep 1
done

journalctl -u "$SERVICE_NAME" -n 60 --no-pager || true
fail "the API did not become healthy after restart"
