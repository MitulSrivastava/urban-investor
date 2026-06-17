#!/usr/bin/env bash
# Build a clean deployment zip for Hostinger.
# Usage: ./deploy.sh
# Then upload urban-investors-deploy.zip via Hostinger hPanel > File Manager
# into public_html and "Extract" it (overwriting existing files).

set -euo pipefail
cd "$(dirname "$0")"

OUT="urban-investors-deploy.zip"
rm -f "$OUT"

# Remove macOS junk before zipping
find . -name ".DS_Store" -not -path "./.git/*" -delete

zip -r -X "$OUT" . \
  -x ".git/*" \
     ".gitignore" \
     ".vscode/*" \
     "google analyttics/*" \
     "node_modules/*" \
     "package.json" \
     "package-lock.json" \
     ".env" \
     ".env.example" \
     ".env.local" \
     "deploy.sh" \
     "urban-investors-hostinger.zip" \
     "$OUT" \
     "*.DS_Store"

echo ""
echo "Built $OUT ($(du -h "$OUT" | cut -f1))"
echo "Next: upload to Hostinger public_html and Extract."
