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

# 生成されたファイルの後処理
GENERATED_FILE_PATH="$ROOT_DIR/src/api/generated/runtime.ts"

echo "Generated file path: $GENERATED_FILE_PATH"

# 生成されたファイルの存在確認
if [ ! -f "$GENERATED_FILE_PATH" ]; then
    echo "Error: Generated runtime.ts file not found at $GENERATED_FILE_PATH"
    exit 1
fi

echo "Applying post-generation modifications..."

# 1. BASE_PATH の置換
echo "  - Updating BASE_PATH to: $BASE_PATH"
sed -i.bak "s|export const BASE_PATH = .*|export const BASE_PATH = '$BASE_PATH';|" "$GENERATED_FILE_PATH"

# 2. DefaultConfig に credentials: 'include' を設定
echo "  - Adding credentials: 'include' to DefaultConfig"
if grep -q "export const DefaultConfig = new Configuration();" "$GENERATED_FILE_PATH"; then
    # シンプルなDefaultConfigが見つかった場合は置換
    sed -i.bak2 "s/export const DefaultConfig = new Configuration();/export const DefaultConfig = new Configuration({\
credentials: 'include'\
});/" "$GENERATED_FILE_PATH"
    echo "    ✓ DefaultConfig updated with credentials: 'include'"
elif grep -q "credentials: 'include'" "$GENERATED_FILE_PATH"; then
    echo "    ✓ credentials: 'include' already present in DefaultConfig"
else
    echo "    ⚠ Warning: Could not automatically update DefaultConfig"
    echo "    Please manually add credentials: 'include' or use src/api/config.ts"
fi

# バックアップファイルを削除
rm -f "${GENERATED_FILE_PATH}.bak" "${GENERATED_FILE_PATH}.bak2"

echo "Post-generation modifications completed!"
