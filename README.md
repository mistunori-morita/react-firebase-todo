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

## coponentsフォルダを作成
- src/components フォルダを作成
- App.jsx
- SignIn.jsx
- SignUp.jsx
```js
import React, { Component } from 'react';


class App extends Component {
  render() {
    return (
      <div>App</div>
    )
  }
}


export default App;

//これをコピーしてSignIn,SignUpに書き換える
```
- index.jsにインポートする
```jsx
//index.js

import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import SignIn from './components/SignIn';
import SignUp from './components/SignUp';


ReactDOM.render(
  <div>App</div>, document.getElementById('root')
)

```

## React-Routerの導入
- 注意！バージョンが変更されているのでnpmでそのまま入れると古い場合は対応しない
- 今回の場合は`npm install react-router@3`で導入
```js
import React from 'react';
import ReactDOM from 'react-dom';
//import
import { Router, Route, browserHistory } from 'react-router';

import App from './components/App';
import SignIn from './components/SignIn';
import SignUp from './components/SignUp';


ReactDOM.render(
  //変更
  <Router path="/" history={browserHistory}>
    <Route path="/app" component={App} />
    <Route path="/signin" component={SignIn} />
    <Route path="/signup" component={SignUp} />
  </Router>
  , document.getElementById('root')
)

//これでlocalhost:3000/appとやって表示されたらok
```

## firebaseセッティング
- firebaseのサイトに行ってプロジェクトの作成
- 1各項目を入力していく
![firebase　プロジェクト作成](react-firebase-auth/images/1.png "1")

- 2各項目を入力していく
![firebase　プロジェクト作成](react-firebase-auth/images/2.png "2")

- 3　この場所をクリック
![firebase　プロジェクト作成](react-firebase-auth/images/3.png "3")

- 4　必要な情報をコピー
![firebase　プロジェクト作成](react-firebase-auth/images/4.png "4")

- src/firebase.jsを作成し先画像の箇所のコードをコピーして貼り付ける
```js
import * as firebase from 'firebase';

const config = {
    apiKey: "xxxxxxxxxxxxxxxx",
    authDomain: "xxxxxxxxxxxxxxxxx.com",
    databaseURL: "xxxxxxxxxxxxxxxx",
    projectId: "xxxxxxxxxxxxxxxx",
    storageBucket: "xxxxxxxxxxxxxxxx",
    messagingSenderId: "xxxxxxxxxxxxxxxx"
  };
//コードは生キュリティーのため一旦xで置き換え本来はここにおく
export const firebaseApp = firebase.initializeApp(config);

```
- index.jsにインポート
```js
import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, browserHistory } from 'react-router';
import { firebaseApp } from './firebase';

import App from './components/App';
import SignIn from './components/SignIn';
import SignUp from './components/SignUp';

firebaseApp.auth().onAuthStateChanged(user => {
  if(user){
    console.log('user has signed in or up', user);
  } else {
    console.log('user has signed out or still needs to sign in.');
  }
})

ReactDOM.render(
  <Router path="/" history={browserHistory}>
    <Route path="/app" component={App} />
    <Route path="/signin" component={SignIn} />
    <Route path="/signup" component={SignUp} />
  </Router>
  , document.getElementById('root')
)
```
