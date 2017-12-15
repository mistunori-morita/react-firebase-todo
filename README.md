# react-firebase-todo
- `create-react-app xxxx`でファイルを作成（好きな場所にcdで移動して作成）
- 作成したreactプロジェクトにcdで移動して`npm-start`で起動
- PORTがバッティングする際は`package.json`を編集して、再度`npm i`
```js
"scripts": {
  "start": "PORT=xxx react-scripts start",

  //XXXに好きな番号を入れる、その後npm iで再起動しないと表示されないので注意
```

## 必要なnpmをインストール
- `npm install redux react-redux react-router firebase --save`を行う


## react-bootstrapを導入
- `public/index.html`の不要なファイルを<link>タグを挿入
- `https://react-bootstrap.github.io/getting-started.html`
- `<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/latest/css/bootstrap.min.css">`


## srcフォルダ以下を削除
- 最初にインストールした状態だとsrcに色々なファイルがあるので一旦削除して新しく作成
- src/index.js
- コンパイルできないときはpackage.jsonを書き換えたことによる影響があるので`npm i`とかやる
```js
import React from 'react';
import ReactDOM from 'react-dom';

ReactDOM.render(
  <div>App</div>, document.getElementById('root')
)

//これでAppと表示されたらおk
```
