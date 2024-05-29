#! /bin/bash
set -x

# Install Python packages
python3 -m pip install -r /workspace/backend/requirements.txt

# Django Setup
# python3 /workspace/backend/manage.py migrate
# python3 /workspace/backend/manage.py inituser --username root --password rootroot --action create_super_admin
