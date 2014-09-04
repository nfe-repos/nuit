#!/bin/sh

if [ -d "dist" ]
then
	echo "START Remove dist folder"
	rm -rf dist
fi

echo "START SPM BUILD"
spm build
echo "START DEPLOY"
node deploy

echo "Clean dist folder"
rm -rf dist

sh ../log.sh
