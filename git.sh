git add .

echo "Enter commit message: "

read commitMessage

git commit -m "[skip ci] $commitMessage"

git push