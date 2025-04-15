#!/bin/bash

# Deploy script for Zero to Infinity

echo "Starting deployment process..."

# Build frontend
echo "Building frontend..."
cd frontend
npm run build
cd ..

# Commit changes
echo "Committing changes to Git..."
git add .
git commit -m "Deployment update $(date)"

# Push to GitHub
echo "Pushing to GitHub..."
git push origin main

echo "Deployment process completed!"
echo "Your code has been pushed to GitHub."
echo "Vercel should automatically deploy the frontend if connected to your repository."
echo "Remember to deploy the backend separately to your chosen platform."
