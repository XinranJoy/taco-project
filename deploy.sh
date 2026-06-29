#!/bin/bash
# 构建并发布到 GitHub Pages (gh-pages 分支)
npm run build && npx gh-pages -d dist -b gh-pages
echo "Done: https://xinranjoy.github.io/taco-project/"
