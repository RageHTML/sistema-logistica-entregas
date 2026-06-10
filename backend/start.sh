#!/bin/sh
echo "Waiting for MySQL..."
until nc -z db 3306; do
  echo "Still waiting..."
  sleep 2
done
echo "MySQL is ready!"

python manage.py migrate
python manage.py runserver 0.0.0.0:8000