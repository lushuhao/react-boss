import React, {Component} from 'react'
import {Grid, List} from 'antd-mobile'
import PropTypes from 'prop-types'

class AvatarSelector extends Component {
  static propTypes = {
    selectAvatar: PropTypes.func.isRequired
  }

  constructor(props) {
    super(props)
    this.state = {}
  }

  onClick = (avatar) => {
    this.setState(avatar)
    this.props.selectAvatar(avatar.text)

  }

  renderHeader = () => {
    const {icon} = this.state
    return (
      <div>
        <span style={{verticalAlign: 'middle', lineHeight: '20px'}}>{icon ? '已选择头像' : '请选择头像'}</span>
        <img style={{marginLeft: '20px', width: 20, verticalAlign: 'middle'}} src={icon}/>
      </div>
    )
  }

  render() {
    const avatarList = ['boy', 'girl', 'man', 'woman', 'bull', 'chick', 'crab', 'hedgehog', 'hippopotamus', 'koala', 'lemur', 'pig', 'tiger', 'whale', 'zebra']
      .map(name => ({
        icon: require(`./${name}.png`),
        text: name
      }))
    return (
      <List renderHeader={this.renderHeader()}>
        <Grid data={avatarList}
              columnNum={5}
              onClick={this.onClick}
        />
      </List>
    )
  }
}

export default AvatarSelector