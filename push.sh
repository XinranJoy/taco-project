#!/bin/bash
# 上传源代码到 GitHub master 分支
git add .
git commit -m "Update" 2>/dev/null || true
git push -u origin master
echo "Done: https://github.com/XinranJoy/taco.github.io"
