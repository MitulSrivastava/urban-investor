#!/usr/bin/env bash
# Build and/or deploy the Urban Investors static site.
#
# Usage:
#   ./deploy.sh           Build urban-investors-deploy.zip (upload manually
#                         via Hostinger hPanel > File Manager > Extract)
#   ./deploy.sh --ftp     Sync files straight to Hostinger over FTP using
#                         the FTP_* credentials in .env (no zip, no manual extract)
#
# Requires for --ftp: lftp  (install with: brew install lftp)

set -euo pipefail
cd "$(dirname "$0")"

# Files/dirs that must never be packaged or uploaded
EXCLUDES=(
  ".git" ".gitignore" ".vscode" "google analyttics"
  "node_modules" "package.json" "package-lock.json"
  ".env" ".env.example" ".env.local"
  "deploy.sh" "update_links.py"
  "urban-investors-deploy.zip" "urban-investors-hostinger.zip"
)

# Strip macOS junk first
find . -name ".DS_Store" -not -path "./.git/*" -delete

build_zip() {
  local out="urban-investors-deploy.zip"
  rm -f "$out"
  local args=()
  for e in "${EXCLUDES[@]}"; do args+=( -x "$e/*" -x "$e" ); done
  zip -r -X "$out" . "${args[@]}" -x "*.DS_Store" >/dev/null
  echo "Built $out ($(du -h "$out" | cut -f1))"
}

deploy_ftp() {
  # Load FTP credentials from .env
  if [[ ! -f .env ]]; then echo "ERROR: .env not found. Copy .env.example to .env and fill FTP_*."; exit 1; fi
  set -a; source .env; set +a

  : "${FTP_HOST:?Set FTP_HOST in .env}"
  : "${FTP_USER:?Set FTP_USER in .env}"
  : "${FTP_PASS:?Set FTP_PASS in .env}"
  FTP_PORT="${FTP_PORT:-21}"
  FTP_REMOTE_DIR="${FTP_REMOTE_DIR:-/public_html}"

  if ! command -v lftp >/dev/null 2>&1; then
    echo "ERROR: lftp not installed. Run: brew install lftp"; exit 1
  fi

  # Build exclude flags for lftp mirror
  local mirror_excludes=""
  for e in "${EXCLUDES[@]}"; do mirror_excludes+=" --exclude-glob $e"; done
  mirror_excludes+=" --exclude-glob *.DS_Store"

  echo "Deploying to ftp://$FTP_HOST$FTP_REMOTE_DIR ..."
  lftp -u "$FTP_USER","$FTP_PASS" -p "$FTP_PORT" "$FTP_HOST" <<LFTP
    set ssl:verify-certificate no
    set ftp:ssl-allow yes
    mirror -R --verbose --only-newer --delete=false $mirror_excludes ./ $FTP_REMOTE_DIR
    bye
LFTP
  echo "Done. Live at your domain."
}

if [[ "${1:-}" == "--ftp" ]]; then
  deploy_ftp
else
  build_zip
  echo "Next: upload to Hostinger public_html and Extract — or run ./deploy.sh --ftp to push directly."
fi
