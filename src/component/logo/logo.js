import React, {Component} from 'react'
import logoImg from './job.png'
import './logo.css'

class Logo extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <div className="logoContainer">
        <img src={logoImg} alt=""/>
      </div>
    )
  }
}

export default Logo