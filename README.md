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
//コードはセキュリティーのため一旦xで置き換え本来はここにおく
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

## SignUp/SignInコンポーネントの作成
- 各コンポーネントを作成していく
```js
//SignUp.jsx

import React, { Component } from 'react';
import { firebaseApp } from '../firebase';

class SignUp extends Component {
  //3 constructor　初期化してstateを準備
  constructor(props){
    super(props);
    this.state = {
      email: '',
      password: '',
      //8 エラー文章の表示設定
      error: {
        message: ''
      }
    }
  }

  //5 signUp関数を設定、最初はコンソールで値が取れているかチェック
  signUp() {
    console.log('this.state', this.state);
    const { email, password } = this.state;
    //6 firebaseとのつなぎこみ
    firebaseApp.auth().createUserWithEmailAndPassword(email, password)
      .catch(error => {
        console.log('error', error);
        //7 errorメッセージの追加
          this.setState({error})
      })
  }

  render() {
    return (
      //1.jsxでコーディングする
      <div className="form-inline">
        <h2>SignUp</h2>
        <div className="form-group">
          <input type="text"
            className="form-control"
            placeholder="email"
            //10 フォームのスタイルをインライン形式で設定
            style={{marginRight: '5px'}}
            // 2 onChangeイベントの設定 setStateで入力された値をthis.stateに代入
            onChange={event => this.setState({email: event.target.value})}/>

          <input type="password"
            className="form-control"
            placeholder="password"
            //10 フォームのスタイルをインライン形式で設定
            style={{marginRight: '5px'}}
            onChange={event => this.setState({password: event.target.value})}/>
          <button className="btn btn-primary"
            type="button"
            //4 onClickでsignUpの関数を走らせる
            onClick={() => this.signUp()}>
            Sign Up
          </button>
        </div>
        //9　エラー表示
        <div>{this.state.error.message}</div>
      </div>
    )
  }
}


export default SignUp;

```
- firebaseの設定でAuthenticationのメールログインを有効にする

![firebase　プロジェクト作成](react-firebase-auth/images/5.png "5")
![firebase　プロジェクト作成](react-firebase-auth/images/6.png "6")
![firebase　プロジェクト作成](react-firebase-auth/images/7.png "7")

- このセッティングをしないとfirebaseに情報が入ってこないので注意
- 設定ができるとフォームから入力された値がAuthenticationユーザーの中に登録されている

```js
//SignIn.jsx

//Sign upをコピーしてsigninに変更する
import React, { Component } from 'react';
//react-routerをインポート
import { Link } from 'react-router';
import { firebaseApp } from '../firebase';

class SignIn extends Component {
  constructor(props){
    super(props);
    this.state = {
      email: '',
      password: '',
      error: {
        message: ''
      }
    }
  }

  signIn() {
    console.log('this.state', this.state);
    const { email, password } = this.state;
    firebaseApp.auth().signInWithEmailAndPassword(email, password)
      .catch(error => {
        this.setState({error})
      })
  }

  render() {
    return (
      <div className="form-inline" style={{margin: '5%'}}>
        <h2>SignIn</h2>
        <div className="form-group">
          <input type="text"
            className="form-control"
            placeholder="email"
            style={{marginRight: '5px'}}
            onChange={event => this.setState({email: event.target.value})}/>

          <input type="password"
            className="form-control"
            placeholder="password"
            style={{marginRight: '5px'}}
            onChange={event => this.setState({password: event.target.value})}/>
          <button className="btn btn-primary"
            type="button"
            onClick={() => this.signIn()}>
            Sign In
          </button>
        </div>
        <div>{this.state.error.message}</div>
        //Link toでリンクをつける
        <div><Link to={'/signup'}>Sign up instaead</Link></div>
      </div>
    )
  }
}


export default SignIn;

```

## browserHistoryを設置
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
    console.log('onn', user);
    browserHistory.push('/app'); //追加することで　サインイン　したらappに飛ぶ
  } else {
    console.log('user has signed out or still needs to sign in.');
    browserHistory.replace('/signin');　//そうじゃなかったらsigninに飛ぶ
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
- browserHistoryを設定したのでAppを作り込む
```js
import React, { Component } from 'react';
//4　Signoutを走らせるためにfirebaseAppをインポートする
import { firebaseApp } from '../firebase';


class App extends Component {
  //3 signOut()関数を設定
  signOut(){
    firebaseApp.auth().signOut();
  }

  render() {
    return (
      //1ボタンとクリックイベントを設定
      <div>
      App
      <button
        className="btn btn-danger"
        //2 イベント設定
        onClick={() => this.signOut()}
        >
        signOut
      </button>
      </div>
    )
  }
}


export default App;
```

## Reduxの実装
- `constants.js`を作成
```js
export const SIGNED_IN = 'SIGNED_IN';

```

```js
//index.jsにインポート
import { createStore} from 'redux';
import { Provider } from 'react-redux';

//宣言しておく必要がある
const store = createStore();

//Providerでラップ
ReactDOM.render(
  <Provider store={store}>
    <Router path="/" history={browserHistory}>
      <Route path="/app" component={App} />
      <Route path="/signin" component={SignIn} />
      <Route path="/signup" component={SignUp} />
    </Router>
  </Provider>
  , document.getElementById('root')
)

```

- reducers/index.jsを作成
```js
import { SIGNED_IN } from '../constants';


let user = {
  email: ull
}


export default ( state = user, action) => {
  switch (action.type) {
    case SIGNED_IN:
      const{ email } = action;
      user = {
        email
      }
      return user;
    default:
        return state;
  }
}

```

- actions/index.jsを作成
```js
import { SIGNED_IN } from '../constants';

export function logUser(email) {
  const action = {
    type: SIGNED_IN,
    email
  }
}

```

```js
// index.js を編集
import React from 'react';
import ReactDOM from 'react-dom';
import { createStore} from 'redux';
import { Provider } from 'react-redux';

import { Router, Route, browserHistory } from 'react-router';
import { firebaseApp } from './firebase';
//action をインポート
import { logUser } from './actions';
//reducerをインポート
import reducer from './reducers';

import App from './components/App';
import SignIn from './components/SignIn';
import SignUp from './components/SignUp';

//reducerを引数に入れる
const store = createStore(reducer);

firebaseApp.auth().onAuthStateChanged(user => {
  if(user){
    const { email } = user;
    store.dispatch(logUser(email));
    browserHistory.push('/app');
  } else {
    console.log('user has signed out or still needs to sign in.');
    browserHistory.replace('/signin');
  }
})

ReactDOM.render(
  <Provider store={store}>
    <Router path="/" history={browserHistory}>
      <Route path="/app" component={App} />
      <Route path="/signin" component={SignIn} />
      <Route path="/signup" component={SignUp} />
    </Router>
  </Provider>
  , document.getElementById('root')
)

```

```js
//actions/index.js

import { SIGNED_IN } from '../constants';

export function logUser(email) {
  const action = {
    type: SIGNED_IN,
    email
  }
  return action;
}

```

- app.jxsを修正
```js
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { firebaseApp } from '../firebase';


class App extends Component {
  signOut(){
    firebaseApp.auth().signOut();
  }

  render() {
    return (
      <div>App

      <button
        className="btn btn-danger"
        onClick={() => this.signOut()}
        >
        signOut
      </button>
      </div>
    )
  }
}

function mapStateToProps(state) {
  console.log('state', state);
  return {

  }
}

export default connect(mapStateToProps,null)(App);

```

## App.jsxを作り込む
- AddGoal
```js
import React, { Component } from 'react';

class AddGoal extends Component {
  constructor(props){
    super(props);
    this.state = {
      title: ''
    }
  }

  addGoal(){
    console.log('this.state', this.state);
  }

  render() {
    return(
      <div className="form-inline">
        <div className="form-group">
          <input type="text"
            placeholder="Add a goal"
            className="form-control"
            style={{marginRigh: '5px'}}
            onChange={ event => this.setState({title: event.target.value})}
            />
          <button className="btn btn-success" type="btn" onClick={() => this.addGoal()}>Submit</button>
        </div>
      </div>
    )
  }
}

export default AddGoal;

```

- App.jsxにインポート
```js
import AddGoal from './AddGoal';

//省略
return (
  <div>
    <h3>Goals</h3>
    //作成したコンッポーネントに置き換え
    <AddGoal />
    <div>Goal List</div>

  <button
    className="btn btn-danger"
    onClick={() => this.signOut()}
    >
    signOut
  </button>
  </div>
)


```

- firebase.jsに追加
- `export const goalRef = firebase.database().ref('goals');`


- AddGoal.jsxにインポート
```js
import React, { Component } from 'react';
//1 インポート
import { goalRef } from '../firebase';

class AddGoal extends Component {
  constructor(props){
    super(props);
    this.state = {
      title: ''
    }
  }

  addGoal(){
    console.log('this.state', this.state);
    //2 goalRefをプッシュsiteDBへ
    goalRef.push({email: 'test@gmail.com', title: this.state.title});
  }

  render() {
    return(
      <div className="form-inline">
        <div className="form-group">
          <input type="text"
            placeholder="Add a goal"
            className="form-control"
            style={{marginRigh: '5px'}}
            onChange={ event => this.setState({title: event.target.value})}
            />
          <button className="btn btn-success" type="btn" onClick={() => this.addGoal()}>Submit</button>
        </div>
      </div>
    )
  }
}

export default AddGoal;

//この段階でfirebase DBに格納される

```

- AddGoal.jsxを編集
```js
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { goalRef } from '../firebase';

class AddGoal extends Component {
  constructor(props){
    super(props);
    this.state = {
      title: ''
    }
  }

  addGoal(){
    console.log('this', this);
    const { title } = this.state;
    const { email } = this.props;
    goalRef.push({email, title});
  }

  render() {
    return(
      <div className="form-inline">
        <div className="form-group">
          <input type="text"
            placeholder="Add a goal"
            className="form-control"
            style={{marginRigh: '5px'}}
            onChange={ event => this.setState({title: event.target.value})}
            />
          <button className="btn btn-success" type="btn" onClick={() => this.addGoal()}>Submit</button>
        </div>
      </div>
    )
  }
}

function mapStateToProps(state) {
  const { email } =state;
  return {
    email
  }
}

export default connect(mapStateToProps, null)(AddGoal);

```

## GoalListコンポーネント作成
- src/components/GoalList.jsxを作成
```js
import React, { Component } from 'react';
import { goalRef } from '../firebase';


class GoalList extends Component {
  componentDidMount(){
    goalRef.on('value', snap => {
      let goals = [];
      snap.forEach(goal => {
        // let goalObject = goal.val();
        const { email, title } = goal.val();
        goals.push({email, title});
      })
      console.log('goals', goals);
    })
  }

  render(){
    return(
      <div>Goall List</div>
    )
  }
}

export default GoalList;

```

- App.jsxに作成したGoalListをインポート
```js
import GoalList from './GoalList';


//省略
return (
  <div>
    <h3>Goals</h3>
    <AddGoal />
    <GoalList />

  <button
    className="btn btn-danger"
    onClick={() => this.signOut()}
    >
    signOut
  </button>
  </div>
```

## reducer追記
- constants.js
```js
export const SET_GOALS = 'SET_GOALS';
```

- actions/index.js
```js
import { SIGNED_IN, SET_GOALS } from '../constants';

export function logUser(email) {
  const action = {
    type: SIGNED_IN,
    email
  }
  return action;
}

//追記
export function setGoals(goals){
  const action = {
    type: SET_GOALS,
    goals
  }
  return action;
}

```

- reducersを分割
- reducer_user
- reuder_goals.js

```
//reducer_golas.
import { SET_GOALS } from '../constants';

export default (state = [], action) => {
  switch (action.type) {
    case SET_GOALS:
      const { goals } = action;
      return goals;
    default:
      return state;
  }
}


```

- reducers/index.jsを作成して二つをまとめる
```js
//reducer/index.js
import { combineReducers } from 'redux';
import user from './reducer_user';
import goals from './reducer_goals';


export default combineReducers({
  user,
  goals
})

```

- GoalListの編集
```js
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { goalRef } from '../firebase';
import { setGoals } from '../actions';

class GoalList extends Component {
  componentDidMount(){
    goalRef.on('value', snap => {
      let goals = [];
      snap.forEach(goal => {
        const { email, title } = goal.val();
        goals.push({email, title});
      })
      console.log('goals', goals);
      this.props.setGoals(goals);
    })
  }

  render(){
    console.log('this.props.goals', this.props.goals);
    return(
      <div>

      </div>
    )
  }
}

function mapStateToProps(state) {
  const { goals } = state;
  return {
    goals
  }
}

export default connect(mapStateToProps, { setGoals })(GoalList);

//この段階でコンソールにdbに登録されているリスト一覧が表示されている次でmap()を使って表示させる
```

## GoalList mapping

```js
return(
  <div>
    {
      //mapで一覧を表示できるようにする
      this.props.goals.map((goal,index) => {
        return(
          <div key={index}>{goal.title}</div>
        )
      })
    }
  </div>
```

- GoalItem.jsxを作成
```jsx
import React, { Component } from 'react';


class CoalItem extends Component {
  render () {
    return(
      <div>Goal Item</div>
    )
  }
}

export default GoalItem;


//作成後GoalListにインポート
```

- GoalItemを作り込む
```js
import React, { Component } from 'react';


class GoalItem extends Component {
  render () {
    console.log('goal item の中身', this.props.goal);
    const { email, title } = this.props.goal;
    return(
      <div style={{margin: '5px'}}>
        <strong>{title}</strong>
        <span> submitted by <em>{email}</em></span>
      </div>
    )
  }
}

export default GoalItem;
//これでタイトルとemailが表示される
```
## GoalItemにボタンを設置
- firebase
```
export const completeGoalRef = firebase.database().ref('completeGoals');

```

```js
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { completeGoalRef } from '../firebase';

class GoalItem extends Component {
  completeGoal() {
    // add to coplete goal

    const { email } = this.props.user;
    const { title } = this.props.goal;
    console.log('email',email,'title', title);
    //firebaseにプッシュすることで登録される
    completeGoalRef.push({email, title});
  }
  render () {
    console.log('goal item の中身', this.props.goal);
    const { email, title } = this.props.goal;
    return(
      <div style={{margin: '5px'}}>
        <strong>{title}</strong>
        <span style={{margin: '5px'}}> submitted by <em>{email}</em></span>
        <button className="btn btn-sm btn-primary"
          onClick={() => this.completeGoal()}>
          complate
        </button>
      </div>
    )
  }
}

function mapStateToProps(state) {
  const { user } = state;
  return {
    user
  }
}

export default connect(mapStateToProps,null)(GoalItem);


```


## 削除ボタン機能
```js
//GoalList.jsx
componentDidMount(){
  goalRef.on('value', snap => {
    let goals = [];
    snap.forEach(goal => {
      const { email, title } = goal.val();
      //serverKeyを取得
      const serverKey = goal.key;
      goals.push({email, title, serverKey});
      console.log('goal', goal);
    })
    console.log('goals', goals);
    this.props.setGoals(goals);
  })
}


//GoalItem.jsx
import { completeGoalRef,goalRef } from '../firebase';


//省略
const { title, serverKey } = this.props.goal;
console.log('serverKey', serverKey);
goalRef.child(serverKey).remove();

```
- firebaseで確認するときちんと消えていることが確認できていればOK


## Redux追加
- src/components/CompleteGoalList.jsxを作成
```js
//baseコンポーネントを作成
import React, { Component } from 'react';


class CompleteGoalList extends Component {
  render(){
    return(
      <div>CompleteGoalList</div>
    )
  }
}
export default CompleteGoalList;

//App.jsでインポート
import CompleteGoalList from './CompleteGoalList';

//省略
render() {
  return (
    <div style={{margin: '5px'}}>
      <h3>Goals</h3>
      <AddGoal />
      <hr/>
      <h4>Goals</h4>
      <GoalList />
      <hr/>
      <h4>Complete Goals</h4>
      <CompleteGoalList />
    <button
      className="btn btn-danger"
      onClick={() => this.signOut()}
      >
//読み込めていたらOk
```

- CompleteGoalListの作り込み
```js
import React, { Component } from 'react';
import { completeGoalRef } from '../firebase';


class CompleteGoalList extends Component {
  componentDidMount() {
    completeGoalRef.on('value', snap =>{
      let completeGoals = [];
      snap.forEach(completeGoal => {
        const { email, title } = completeGoal.val();
        completeGoals.push({email, title})
      })
      console.log('completeGoals', completeGoals);
    })
  }
  render(){
    return(
      <div>CompleteGoalList</div>
    )
  }
}
export default CompleteGoalList;


```

- constants.jsを追記
```js
export const SET_COMPLETED = 'SET_COMPLETED';
```
- actions/index.jsに追記
```js
//SET_COMPLETED　をインポート
import { SIGNED_IN, SET_GOALS, SET_COMPLETED} from '../constants';


export function setcompleted(completeGoals){
  const action = {
    type: SET_COMPLETED,
    completeGoals
  }
  return action;
}
```
- reducers/reducer_completed_goals.js
```js
import { SET_COMPLETED } from '../constants';


export default(state = [], action) => {
  switch (action.type) {
    case SET_COMPLETED:
      const { completeGoals } = action;
      return completeGoals;
    default:
      return state;
  }
}
```

- reducers/index.jsにインポート
```js
import { combineReducers } from 'redux';
import user from './reducer_user';
import goals from './reducer_goals';
//import
import completeGoals from './reducer_completed_goals';

export default combineReducers({
  user,
  goals,
  //import
  completeGoals
})


```

## レンダリングcopmleteGoals
- CompleteGoalListを修正
```js
import React, { Component } from 'react';
import { completeGoalRef } from '../firebase';
import { connect } from 'react-redux';
import { setCompleted } from '../actions'

class CompleteGoalList extends Component {
  componentDidMount() {
    completeGoalRef.on('value', snap =>{
      let completeGoals = [];
      snap.forEach(completeGoal => {
        const { email, title } = completeGoal.val();
        completeGoals.push({email, title})
      })
      console.log('completeGoals', completeGoals);
      this.props.setCompleted(completeGoals);
    })
  }
  //削除機能
  clearCompleted(){
    completeGoalRef.set([]);
  }

  render(){
    console.log('this.props.completeGoals' ,this.props.completeGoals);
    return(
      <div>
        {
          this.props.completeGoals.map((completeGoal, index) =>{
            const { title, email } = completeGoal;
            return (
              <div key={index}>
                <strong>{title}</strong>
                completed by
                <em>{email}</em>
              </div>
            )
          })
        }
        //全部削除のボタン
        <button className="btn btn-primary"
          onClick={ () => this.clearCompleted() }
          >
          clear All</button>
      </div>
    )
  }
}

function mapStateToProps(state) {
  const { completeGoals } = state;
  return {
    completeGoals
  }
}
export default connect(mapStateToProps, { setCompleted })(CompleteGoalList);

```

# まとめ
- 認証：電子メール、パスワード、displayNameなどの情報を使って、ユーザーがサインアップしてアプリケーションにサインインできるようにします。

- React Router - Reactアプリケーションでのルーティングを可能にするJavaScriptライブラリ。React Routerを使用すると、アプリケーションは特定のコンポーネントにURLを送信することを許可できます。

- Firebase - アプリケーションがリアルタイムのデータベースと完全な認証を持つことを可能にするGoogleによって提供されるサービス。

- Firebaseの リファレンス - firebaseデータベースの場所にマップして、複数の方法でデータを操作できます。

- browserHistory - Reactアプリケーションは、訪問したURLを保存することにより、アプリケーション全体のユーザーナビゲーションを追跡することができます。また、アプリケーションがユーザーを特定のコンポーネントにリダイレクトするのを処理できるようにします。

- combineReducers - アプリケーションが複数のレデューサーを結合し、それらを1つのレデューサーとしてエクスポートできるようにするreduxメソッド。
