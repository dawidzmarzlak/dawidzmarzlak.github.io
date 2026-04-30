#!/usr/bin/env bash
# pg_dump → /srv/itsolutions/backups/dump-YYYY-MM-DD.sql.gz
# Add to cron: 0 3 * * * /home/app/itsolutions/deploy/backup.sh

set -euo pipefail

BACKUP_DIR="/srv/itsolutions/backups"
DATE=$(date +%Y-%m-%d)
DUMP_FILE="${BACKUP_DIR}/dump-${DATE}.sql"

mkdir -p "${BACKUP_DIR}"

cd "$(dirname "$0")/.."

# Load .env so DB_USER / DB_NAME are available.
if [ -f .env ]; then
  # shellcheck disable=SC1091
  set -a; source .env; set +a
fi

DB_USER="${DB_USER:-postgres}"
DB_NAME="${DB_NAME:-itsolutions}"

docker compose exec -T postgres pg_dump -U "${DB_USER}" "${DB_NAME}" > "${DUMP_FILE}"
gzip -f "${DUMP_FILE}"

# Retention: keep last 14 daily backups locally.
find "${BACKUP_DIR}" -name "dump-*.sql.gz" -mtime +14 -delete

echo "Backup OK: ${DUMP_FILE}.gz ($(du -h ${DUMP_FILE}.gz | cut -f1))"

# TODO: off-site sync — uzupełnij wybraną metodą:
# aws s3 cp "${DUMP_FILE}.gz" "s3://itsolutions-backups/postgres/" --profile itsolutions
# rclone copy "${DUMP_FILE}.gz" b2:itsolutions-backups/postgres/
# restic -r s3:s3.eu-central-1.amazonaws.com/itsolutions-backups backup "${DUMP_FILE}.gz"
