#!/bin/zsh

set -euo pipefail

readonly SOURCE_DIR="${0:A:h}"
readonly SHARED_DIR="/Users/Shared/Lexistories"
readonly APP_TARGET="/Applications/Lexistories.app"
readonly PYTHON_BIN="$(command -v python3)"

if [[ ! -w /Applications || ! -w /Users/Shared ]]; then
    print -u2 "Χρειάζονται δικαιώματα διαχειριστή για εγκατάσταση σε όλους τους λογαριασμούς."
    exit 1
fi

/usr/bin/install -d -m 755 "$SHARED_DIR" "$APP_TARGET"

for item in \
    app.py \
    index.html \
    manifest.webmanifest \
    sw.js \
    icon-192.png \
    icon-512.png \
    example_story_pack.json \
    README.txt \
    README_MAC.md \
    requirements.txt; do
    /usr/bin/ditto "$SOURCE_DIR/$item" "$SHARED_DIR/$item"
done

/usr/bin/ditto "$SOURCE_DIR/.streamlit" "$SHARED_DIR/.streamlit"
/usr/bin/ditto "$SOURCE_DIR/assets" "$SHARED_DIR/assets"
/usr/bin/ditto "$SOURCE_DIR/macos/Lexistories.app" "$APP_TARGET"

if [[ ! -x "$SHARED_DIR/.venv/bin/python3" ]]; then
    "$PYTHON_BIN" -m venv --system-site-packages "$SHARED_DIR/.venv"
fi

if ! "$SHARED_DIR/.venv/bin/python3" -c 'import streamlit' 2>/dev/null; then
    "$SHARED_DIR/.venv/bin/python3" -m pip install -r "$SHARED_DIR/requirements.txt"
fi

/bin/chmod 755 "$APP_TARGET/Contents/MacOS/Lexistories"
/bin/chmod -R a+rX "$SHARED_DIR" "$APP_TARGET"

print "Η εγκατάσταση ολοκληρώθηκε."
print "Άνοιξε τα «Μαθήματά μου» από τον φάκελο Εφαρμογές."
