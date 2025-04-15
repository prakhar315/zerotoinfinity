#!/usr/bin/env bash
# exit on error
set -o errexit

# Print current directory for debugging
echo "Current directory: $(pwd)"
ls -la

# Install dependencies
pip install -r requirements.txt

# Collect static files
python manage.py collectstatic --no-input

# Apply migrations
python manage.py migrate

# Create admin user if it doesn't exist
python create_admin.py

# Print WSGI module path for debugging
echo "WSGI module path: takeyouforward.wsgi"
