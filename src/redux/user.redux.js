import axios from 'axios'
import {getRedirectPath} from '../util'

const AUTH_SUCCESS = 'AUTH_SUCCESS'
const ERROR_MSG = 'ERROR_MSG'
const LOAD_DATA = 'LOAD_DATA'

const initState = {
  redirectTo: '',
  msg: '',
  user: '',
  type: ''
}

export function user(state = initState, action) {
  switch (action.type) {
    case AUTH_SUCCESS:
      return {...state, redirectTo: getRedirectPath(action.payload), msg: '', ...action.payload}
    case ERROR_MSG:
      return {...state, isAuth: false, msg: action.msg}
    case LOAD_DATA:
      return {...state, ...action.payload}
    default:
      return state
  }
}

function authSuccess(userInfo) {
  return {type: AUTH_SUCCESS, payload: userInfo}
}

function errorMsg(msg) {
  return {type: ERROR_MSG, msg}
}

export function loadData(userInfo) {
  return {type: LOAD_DATA, payload: userInfo}
}

function axiosHandle(dispatch) {
  return res => {
    const {status, data} = res
    if (status === 200 && data.code === 1) {
      dispatch(authSuccess(data.data))
    } else {
      dispatch(errorMsg(data.msg))
    }
  }
}

export function update(data) {
  return dispatch => {
    axios.post('/user/update', data)
      .then(axiosHandle(dispatch))
  }
}

export function login({user, pwd}) {
  if (!user || !pwd) {
    return errorMsg('请输入用户名和密码')
  }
  return dispatch => {
    axios.post('/user/login', {user, pwd})
      .then(axiosHandle(dispatch))
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
      .then(axiosHandle(dispatch))
  }
}