#!/bin/bash
for file in fairfox-eon.html crc-the-flagship.html gaur-chrysalis-2.html gaur-bento.html onyx-by-splendor.html noida-sector-145-plots.html eldeco-7-peaks.html ace-parkway.html gaur-chrysalis.html eldeco-whispers-of-wonder.html; do
  vid=$(grep -o '"thumbnailUrl": "https://img.youtube.com/vi/[^/]*/maxresdefault.jpg"' "$file" | sed -E 's/.*\/vi\/([^/]+)\/maxresdefault.jpg.*/\1/')
  if [ ! -z "$vid" ]; then
    url="https://img.youtube.com/vi/$vid/maxresdefault.jpg"
    status=$(curl -o /dev/null -s -w "%{http_code}\n" "$url")
    echo "$file : $vid : maxresdefault.jpg : HTTP $status"
  fi
done
