#!/bin/bash

set -e

password=""
output="public_schema_backup.sql"

while [[ $# -gt 0 ]]; do
    case "$1" in
        -p|--password)
            password=$2
            shift 2
            ;;
        -o|--output)
            output=$2
            shift 2
            ;;
        *)
            echo "Invalid option: $1"
            exit 1
            ;;
    esac
done

if [ ! -z "$password" ]; then
  pg_dump "postgres://postgres.grrrndvlclowgkgbgkso:$password@aws-0-eu-central-1.pooler.supabase.com:6543
  /postgres" -n public -F p -f $output
else 
  echo "failed to backup. provide a password via the --password flag"
  exit 1
fi