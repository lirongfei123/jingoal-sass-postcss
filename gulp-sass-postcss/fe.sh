#!/bin/sh
appPath=$(pwd)"/"$1
echo "当前目录"$(pwd)
#gulp sass --key $appPath
#gulp sprite --key $appPath
gulp default --key $appPath