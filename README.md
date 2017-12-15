# react-firebase-todo
- `create-react-app xxxx`でファイルを作成（好きな場所にcdで移動して作成）
- 作成したreactプロジェクトにcdで移動して`npm-start`で起動
- PORTがバッティングする際は`package.json`を編集して、再度`npm i`
```js
"scripts": {
  "start": "PORT=xxx react-scripts start",

  //XXXに好きな番号を入れる、その後npm iで再起動しないと表示されないので注意
```
