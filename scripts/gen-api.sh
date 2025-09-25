#!/bin/bash -eux

# 引数で書き込むBASE_PATHを切り替える
if [ "$#" -ne 1 ]; then
  echo "Error: Incorrect number of arguments."
  echo "Usage: $0 <environment>"
  echo "Please specify the environment as 'production' or 'development', and provide a second argument."
  exit 1
fi

if [ "$1" = "production" ]; then
  BASE_PATH="https://traojudge.trap.show/api"
elif [ "$1" = "development" ]; then
  BASE_PATH="http://localhost:4010"
else
  echo "Error: Invalid argument: $1"
  echo "Please specify the environment as 'production' or 'development'."
  exit 1
fi

SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
ROOT_DIR="$SCRIPT_DIR/.."
cd "$ROOT_DIR"

# APIクライアントの生成
npx @openapitools/openapi-generator-cli generate \
  -i https://raw.githubusercontent.com/traP-jp/traO-Judge-docs/refs/heads/develop/api/backend/frontend-backend.yaml \
  -g typescript-fetch \
  -o "$ROOT_DIR/src/api/generated"

# 生成されたファイルの中で BASE_PATH を置換
GENERATED_FILE_PATH="$ROOT_DIR/src/api/generated/runtime.ts"

sed -i.bak "s|export const BASE_PATH = .*|export const BASE_PATH = '$BASE_PATH';|" "$GENERATED_FILE_PATH"

# バックアップファイルを削除
rm "${GENERATED_FILE_PATH}.bak"
