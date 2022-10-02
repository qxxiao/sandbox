#!/bin/bash
set -e # exit on error

to=$1  # timeout
shift

# log >> temp/test/log
echo docker run --rm -itd "$@" 
######################################################
# 运行容器，并且获取containnerId
cont=$(docker run --rm -itd "$@")
code=$(timeout "$to" docker wait "$cont" || true)

docker kill $cont # kill container,如果已经退出/不存在报错)
# docker wait 会打印退出码，非正常退出会得到true输出结果空串
echo -n 'status: '
if [ -z "$code" ]; then
    echo timeout 
else
    echo exited: $code
fi

# remove container/ not needed
docker rm $cont &> /dev/null 