import React, {Component, Fragment} from 'react'
import {connect} from 'react-redux'
import {update} from '../../redux/user.redux'
import {Redirect} from 'react-router-dom'
import {NavBar, InputItem, TextareaItem, Button} from 'antd-mobile'
import AvatarSelector from 'component/avatarSelector/avatarSelector'

@connect(state => state.user, {update})
class GeniusInfo extends Component {
  constructor(props) {
    super(props)
    this.state = {
      title: '',
      money: '',
      desc: ''
    }
  }

  onInputChange(key, value) {
    this.setState({
      [key]: value
    })
  }

  selectAvatar = (avatar) => {
    this.setState({avatar})
  }

  render() {
    const {redirectTo, update, location} = this.props

    return (
      <Fragment>
        {redirectTo
        && location.pathname !== redirectTo
        && <Redirect to={redirectTo}/>}
        <NavBar mode="dark">牛人完善信息页</NavBar>
        <AvatarSelector selectAvatar={this.selectAvatar}/>
        <InputItem onChange={v => this.onInputChange('title', v)}>求职岗位</InputItem>
        <InputItem onChange={v => this.onInputChange('money', v)}>期望薪资</InputItem>
        <TextareaItem title='个人简介' rows={3} autoHeight onChange={v => this.onInputChange('desc', v)}/>
        <Button
          onClick={() => update(this.state)}
          type='primary'>保存</Button>
      </Fragment>
    )
  }
}

export default GeniusInfo