#!/bin/sh
# SQLite Database Backup Script for Legacy Teleprompter
# Saves a timestamped copy of the DB to the data/backups directory

set -e

# Resolve directories relative to the repository root
SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
ROOT_DIR="$(cd "$SCRIPT_DIR/.." && pwd)"
DB_DIR="$ROOT_DIR/data"
BACKUP_DIR="$DB_DIR/backups"
DB_FILE="$DB_DIR/scripts.db"

# Create backup directory if it doesn't exist
mkdir -p "$BACKUP_DIR"

if [ ! -f "$DB_FILE" ]; then
    echo "Error: Database file not found at $DB_FILE"
    exit 1
fi

TIMESTAMP=$(date +"%Y-%m-%d_%H-%M-%S")
BACKUP_FILE="$BACKUP_DIR/scripts-backup-$TIMESTAMP.db"

echo "Backing up database..."
cp "$DB_FILE" "$BACKUP_FILE"

# Clean up backups older than 7 days (optional, keeps disk tidy)
echo "Cleaning up backups older than 7 days..."
find "$BACKUP_DIR" -name "scripts-backup-*.db" -type f -mtime +7 -delete

echo "Backup successful: $BACKUP_FILE"
