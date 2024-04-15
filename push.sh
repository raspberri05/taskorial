#!/bin/bash

# Go to the "server" directory
cd server || exit
echo "Formatting files in server directory..."
npx prettier --write .

# Go back to the root directory
cd ..

# Go to the "react-auth" directory
cd react-auth || exit
echo "Formatting files in react-auth directory..."
npx prettier --write .

# Go back to the root directory
cd ..

# Check if there are changes on remote repository
echo "Checking for changes on remote repository..."
git remote update &> /dev/null
if [ $(git rev-parse HEAD) != $(git rev-parse @{u}) ]; then
  echo "New changes found. Please pull before committing and pushing."
  exit 1
else
  echo "No new changes found. Proceeding with commit and push."
fi

# Prompt user for commit message
echo "Enter your commit message:"
read commit_message

# Git add, commit, and push
git add .
git commit -m "$commit_message"
git push