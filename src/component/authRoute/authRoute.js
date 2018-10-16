import React, {Component} from 'react'
import {connect} from 'react-redux'
import {loadData} from '../../redux/user.redux'
import axios from 'axios'
import {withRouter} from 'react-router-dom'

@withRouter
@connect(null, {loadData})
class AuthRoute extends Component {
  constructor(props) {
    super(props)
  }

  componentDidMount() {
    const publicList = ['/login', '/register']
    const pathname = this.props.location.pathname
    if (publicList.includes(pathname)) return
    this.getUserInfo()
  }

  getUserInfo = () => {
    axios.get('/user/info')
      .then(res => {
        const {status, data} = res
        if (status === 200) {
          if (data.code === 1) {
            this.props.loadData(data.data)
          } else {
            this.props.history.push('/login')
          }
        }
      })
  }

  render() {
    return <div></div>
  }
}

export default AuthRoute