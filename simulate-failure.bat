@echo off
echo Simulating CI/CD build failure...

REM Install dependencies
npm install

REM Try to run the missing script
echo Running npm run build:production...
npm run build:production 2>&1
if %errorlevel% neq 0 (
    echo Build failed as expected
    echo This would trigger the webhook in real CI/CD
) else (
    echo Build succeeded unexpectedly
)