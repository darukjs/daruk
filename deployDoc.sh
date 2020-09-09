#!/usr/bin/env sh

# abort on errors
set -e

# build
npm run doc

# navigate into the build output directory
cp CNAME docs/
cd docs/

# if you are deploying to a custom domain
# echo 'www.example.com' > CNAME

git init
git add -A
git commit -m 'deploy doc'

# if you are deploying to https://<USERNAME>.github.io
# git push -f git@github.com:<USERNAME>/<USERNAME>.github.io.git master

# if you are deploying to https://<USERNAME>.github.io/<REPO>
# git push -f https://github.com/Youjingyu/clinic-doc-zh.git master:gh-pages
git push -f https://github.com/darukjs/daruk.git master:gh-pages

cd -