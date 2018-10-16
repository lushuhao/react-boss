import React, {Component, Fragment} from 'react'
import {connect} from 'react-redux'
import {login} from '../../redux/user.redux'
import Logo from '../../component/logo/logo'
import {Redirect} from 'react-router-dom'
import {List, InputItem, WingBlank, WhiteSpace, Button} from 'antd-mobile'

@connect(state => state.user, {login})
class Login extends Component {
  constructor(props) {
    super(props)
    this.state = {
      user: '',
      pwd: ''
    }
  }

  login = () => {
    this.props.login(this.state)
  }

  register = () => {
    this.props.history.push('/register')
  }

  onInputChange(key, value) {
    this.setState({
      [key]: value
    })
  }

  render() {
    return (
      <Fragment>
        {this.props.redirectTo && <Redirect to={this.props.redirectTo}/>}
        <Logo/>
        <WingBlank>
          <List>
            <InputItem onChange={(v) => this.onInputChange('user', v)}>用户名</InputItem>
            <InputItem type='password'
                       onChange={(v) => this.onInputChange('pwd', v)}>密码</InputItem>
          </List>
          <WhiteSpace/>
          <Button type='primary' onClick={this.login}>登录</Button>
          <WhiteSpace/>
          <Button onClick={this.register} type='primary'>注册</Button>
        </WingBlank>
      </Fragment>
    )
  }
}

export default Login