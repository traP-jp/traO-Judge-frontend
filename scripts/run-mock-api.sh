#!/bin/bash -eux

# スクリプトのディレクトリを基準にパスを設定
SCRIPT_DIR=$(dirname "$0")

# Dockerコンテナをバックグラウンドで起動し、指定された設定ファイルを使用してモックサーバーを立ち上げる
docker run -d --mount type=bind,source="${SCRIPT_DIR}/../src/api/mock/front-back-api-mock.json",target=/data,readonly -p 4010:4010 mockoon/cli:latest -d /data -p 4010