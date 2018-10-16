import axios from 'axios'
import {getRedirectPath} from '../util'

const LOGIN_SUCCESS = 'LOGIN_SUCCESS'
const REGISTER_SUCCESS = 'REGISTER_SUCCESS'
const ERROR_MSG = 'ERROR_MSG'
const LOAD_DATA = 'LOAD_DATA'

const initState = {
  redirectTo: '',
  isAuth: false,
  msg: '',
  user: '',
  type: ''
}

export function user(state = initState, action) {
  switch (action.type) {
    case LOGIN_SUCCESS:
      return {...state, redirectTo: getRedirectPath(action.payload), isAuth: true, msg: '', ...action.payload}
    case REGISTER_SUCCESS:
      return {...state, redirectTo: getRedirectPath(action.payload), isAuth: true, msg: '', ...action.payload}
    case ERROR_MSG:
      return {...state, isAuth: false, msg: action.msg}
    case LOAD_DATA:
      return {...state, ...action.payload}
    default:
      return state
  }
}

function loginSuccess(userInfo) {
  return {type: LOGIN_SUCCESS, payload: userInfo}
}

function registerSuccess(userInfo) {
  return {type: REGISTER_SUCCESS, payload: userInfo}
}

function errorMsg(msg) {
  return {type: ERROR_MSG, msg}
}

export function loadData(userInfo) {
  return {type: LOAD_DATA, payload: userInfo}
}

export function login({user, pwd}) {
  if (!user || !pwd) {
    return errorMsg('请输入用户名和密码')
  }
  return dispatch => {
    axios.post('/user/login', {user, pwd})
      .then(res => {
        const {status, data} = res
        if (status === 200 && data.code === 1) {
          dispatch(loginSuccess(data.data))
        } else {
          dispatch(errorMsg(data.msg))
        }
      })
  }
}

export function register({user, pwd, repeatPwd, type}) {
  if (!user || !pwd) {
    return errorMsg('请输入用户名和密码')
  }
  if (pwd !== repeatPwd) {
    return errorMsg('两次输入的密码不一致')
  }
  return dispatch => {
    axios.post('/user/register', {user, pwd, type})
      .then(res => {
        const {status, data} = res
        if (status === 200 && data.code === 1) {
          dispatch(registerSuccess(data.data))
        } else {
          dispatch(errorMsg(data.msg))
        }
      })
  }
}