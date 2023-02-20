#!/bin/bash
rsync -r --exclude=.git /run/user/1001/gvfs/ftp:host=losto.net,user=pogoda%40losto.net/* /home/spolek/temp
cd /home/spolek/temp
git add .
git commit -m "$1"
git push
