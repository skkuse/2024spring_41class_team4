#! /bin/bash
set -x

# Install Python packages
python3 -m pip install -r /workspace/api/requirements.txt

# Django Setup
python3 /workspace/api/manage.py migrate

git config --global --add safe.directory /workspace