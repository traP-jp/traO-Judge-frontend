#!/bin/bash -eux

# 引数で書き込むBASE_PATHを切り替える
if [ "$1" = "production" ]; then
  BASE_PATH="https://trao-judge-backend.trap.show/v0"
elif [ "$1" = "development" ]; then
  BASE_PATH="http://localhost:4010"
else
  echo "Invalid argument: $1"
  exit 1
fi

# APIクライアントの生成
docker run --rm -v "$(dirname $0)/../:/local" -u $(id -u):$(id -g) openapitools/openapi-generator-cli generate \
    -i https://raw.githubusercontent.com/traP-jp/traO-Judge-docs/refs/tags/1.1.0/api/backend/frontend-backend.yaml \
    -g typescript-fetch \
    -o /local/src/api/generated

# 生成されたファイルの中でBASE_PATHを置換
GENERATED_FILE_PATH="./src/api/generated/runtime.ts"
sed -i '' "s|export const BASE_PATH = .*|export const BASE_PATH = '$BASE_PATH';|" $GENERATED_FILE_PATH