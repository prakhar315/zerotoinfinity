#!/bin/bash

# Setup script for Zero to Infinity

echo "Starting setup process..."

# Setup frontend
echo "Setting up frontend..."
cd frontend
npm install
cd ..

# Setup backend
echo "Setting up backend..."
cd backend

# Create virtual environment
echo "Creating virtual environment..."
python -m venv venv

# Activate virtual environment
echo "Activating virtual environment..."
source venv/bin/activate || source venv/Scripts/activate

# Install dependencies
echo "Installing dependencies..."
pip install -r requirements.txt

# Run migrations
echo "Running migrations..."
python manage.py migrate

# Create admin user
echo "Creating admin user..."
python create_admin.py

# Deactivate virtual environment
echo "Deactivating virtual environment..."
deactivate

cd ..

echo "Setup process completed!"
echo "You can now start the development servers:"
echo "- Frontend: cd frontend && npm start"
echo "- Backend: cd backend && source venv/bin/activate && python manage.py runserver"
