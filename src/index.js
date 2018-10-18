import React, {Fragment} from 'react'
import ReactDOM from 'react-dom'
import {createStore, applyMiddleware, compose} from 'redux'
import {Provider} from 'react-redux'
import {BrowserRouter, Route, Redirect, Switch} from 'react-router-dom'

import thunk from 'redux-thunk'
import reducers from './reducer'

import AuthRoute from './component/authRoute/authRoute'
import BossInfo from './container/bossInfo/bossInfo'
import GeniusInfo from './container/geniusInfo/geniusInfo'
import Login from './container/login/login'
import Register from './container/register/register'
import './config'

const reduxDevtools = window.devToolsExtension
const store = createStore(reducers, compose(
  applyMiddleware(thunk),
  reduxDevtools && reduxDevtools()
))

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <Fragment>
        <AuthRoute />
        <Route path='/bossInfo' component={BossInfo}/>
        <Route path='/geniusInfo' component={GeniusInfo}/>
        <Route path='/login' component={Login}/>
        <Route path='/register' component={Register}/>
      </Fragment>
    </BrowserRouter>
  </Provider>,
  document.getElementById('root')
)

//  +++++ 加入模块热替换 +++++
if (module.hot) {
  module.hot.accept();
}