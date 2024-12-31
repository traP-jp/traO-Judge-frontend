
#!/bin/bash -eux

# 引数で書き込むBASE_PATHを切り替える
if [ "$#" -ne 1 ]; then
  echo "Error: Incorrect number of arguments."
  echo "Usage: $0 <environment>"
  echo "Please specify the environment as 'production' or 'development', and provide a second argument."
  exit 1
fi

if [ "$1" = "production" ]; then
  BASE_PATH="https://trao-judge-backend.trap.show/v0"
elif [ "$1" = "development" ]; then
  BASE_PATH="http://localhost:4010"
else
  echo "Error: Invalid argument: $1"
  echo "Please specify the environment as 'production' or 'development'."
  exit 1
fi

# APIクライアントの生成
docker run --rm -v "$(dirname $0)/../:/local" -u $(id -u):$(id -g) openapitools/openapi-generator-cli generate \
    -i https://raw.githubusercontent.com/traP-jp/traO-Judge-docs/refs/tags/1.1.0/api/backend/frontend-backend.yaml \
    -g typescript-fetch \
    -o /local/src/api/generated

# 生成されたファイルの中でBASE_PATHを置換
GENERATED_FILE_PATH="$(dirname $0)/../src/api/generated/runtime.ts"

# sedコマンドでBASE_PATHを置換し，バックアップファイルを作成
sed -i.bak "s|export const BASE_PATH = .*|export const BASE_PATH = '$BASE_PATH';|" $GENERATED_FILE_PATH

# バックアップファイルを削除
rm "${GENERATED_FILE_PATH}.bak"