#! /bin/bash
set -x

# Install Python packages
python3 -m pip install -r /workspace/api/requirements.txt

# Django Setup
# python3 /workspace/backend/manage.py migrate