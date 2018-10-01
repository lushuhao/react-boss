import React, {Component, Fragment} from 'react'
import {Button} from 'antd-mobile'
import 'antd-mobile/dist/antd-mobile.css';

class App extends Component {
  render() {
    let name = 'li'
    return (
      <Fragment>
        <h1>独立团,{name}</h1>
        <Child name='zhang ji'></Child>
        <FnChild name='ce'></FnChild>
        <Button type='primary'>测试</Button>
      </Fragment>
    )
  }
}

function FnChild(props) {
  return <h3>{props.name}</h3>
}

class Child extends Component {
  constructor(props) {
    super(props)
    this.state = {
      name: [1, 2, 3, 4]
    }
  }

  render() {
    return (
      <Fragment>
        <h2>{this.props.name}</h2>
        <ul>
          {this.state.name.map(item => {
            return <li key={item}>{item}</li>
            })
          }
        </ul>
      </Fragment>
    )
  }
}

export default App