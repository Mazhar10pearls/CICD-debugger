#!/bin/bash

echo "Simulating CI/CD build failure..."

# Install dependencies
npm install

# Try to run the missing script
echo "Running npm run build:production..."
if npm run build:production 2>&1; then
    echo "Build succeeded unexpectedly"
else
    echo "Build failed as expected"
    echo "This would trigger the webhook in real CI/CD"
fi