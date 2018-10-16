import React, {Component, Fragment} from 'react'
import {connect} from 'react-redux'
import {Redirect} from 'react-router-dom'
import Logo from '../../component/logo/logo'
import {List, InputItem, WingBlank, WhiteSpace, Button, Radio} from 'antd-mobile'
import {register} from '../../redux/user.redux'

@connect(state=> state.user, {register})
class Register extends Component {
  constructor(props) {
    super(props)
    this.state = {
      user: '',
      pwd: '',
      repeatPwd: '',
      type: 'genius'
    }
  }

  onInputChange(key, value) {
    this.setState({
      [key]: value
    })
  }

  onClickRegister = () => {
    this.props.register(this.state)
  }

  render() {
    const RadioItem = Radio.RadioItem
    return (
      <Fragment>
        {this.props.redirectTo && <Redirect to={this.props.redirectTo}/>}
        <Logo/>
        <WingBlank>
          <List>
            <InputItem onChange={(v) => this.onInputChange('user', v)}>用户名</InputItem>
            <InputItem type='password'
                       onChange={(v) => this.onInputChange('pwd', v)}>密码</InputItem>
            <InputItem type='password'
                       onChange={(v) => this.onInputChange('repeatPwd', v)}>确认密码</InputItem>
            <RadioItem onChange={() => this.onInputChange('type', 'genius')}
                       checked={this.state.type === 'genius'}>牛人</RadioItem>
            <RadioItem onChange={() => this.onInputChange('type', 'boss')}
                       checked={this.state.type === 'boss'}>BOSS</RadioItem>
          </List>
          <WhiteSpace/>
          <Button type='primary'
                  onClick={this.onClickRegister}>注册</Button>
        </WingBlank>
      </Fragment>
    )
  }
}

export default Register