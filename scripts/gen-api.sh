#!/bin/bash -eux

docker run --rm -v "$(dirname $0)/../:/local" -u $(id -u):$(id -g) openapitools/openapi-generator-cli generate \
    -i https://raw.githubusercontent.com/traP-jp/traO-Judge-docs/refs/tags/1.1.0/api/backend/frontend-backend.yaml \
    -g typescript-fetch \
    -o /local/src/api
