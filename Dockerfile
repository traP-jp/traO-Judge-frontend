# Dockerfile
FROM node:14

# Prismのインストール
RUN npm install -g @stoplight/prism-cli

# 作業ディレクトリの設定
WORKDIR /app

# モックサーバーを起動
CMD ["prism", "mock", "https://raw.githubusercontent.com/traP-jp/traO-Judge-docs/refs/tags/1.1.0/api/backend/frontend-backend.yaml", "-h", "0.0.0.0"]

