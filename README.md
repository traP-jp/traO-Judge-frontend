# traO-Judge-frontend

traP Online Judge フロントエンド

This template should help get you started developing with Vue 3 in Vite.

## Recommended IDE Setup

[VSCode](https://code.visualstudio.com/) + [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) (and disable Vetur).

## Type Support for `.vue` Imports in TS

TypeScript cannot handle type information for `.vue` imports by default, so we replace the `tsc` CLI with `vue-tsc` for type checking. In editors, we need [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) to make the TypeScript language service aware of `.vue` types.

## Customize configuration

See [Vite Configuration Reference](https://vitejs.dev/config/).

## Project Setup

```sh
npm install
```

### Compile and Hot-Reload for Development

```sh
npm run dev
```

### Type-Check, Compile and Minify for Production

```sh
npm run build
```

### Lint with [ESLint](https://eslint.org/)

```sh
npm run lint
```

## API周りのコード生成の仕方

`./scripts/gen-api.sh`を実行してください。APIを利用する部分については，生成されたコードを使って実装をしてください。

## mockサーバーの立ち上げ方

開発環境においては，モックサーバーを利用します。モックサーバーの立ち上げには`./scripts/run-mock-api.sh`を実行してください。
このファイルを実行すると`localhost:4010`にモックサーバーが立ち上がりますので，ここで提供されるAPIを叩いてください。
