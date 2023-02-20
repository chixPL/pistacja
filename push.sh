#!/bin/bash
repo_dir = $(pwd)
if [[ "$repo_dir" == *"pogoda"* ]]; then
  $target_dir = $HOME/temp/pogoda
elif [[ "$repo_dir" == *"g1"* ]]; then
  $target_dir = $HOME/temp/g1
fi
rsync -r --update --exclude=.git $repo_dir/* $target_dir
cd $target_dir
git add .
git commit -m "$1"
git push
