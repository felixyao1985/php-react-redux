import React from 'react'
import { Link,hashHistory } from 'react-router'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import objectAssign from 'object-assign'  //是轻量级 React 类状态更新快捷方式
import { SzLib, RcFormUtil } from '../../common'
import BaseComponent from '../BaseComponent.js'
import './domain.css'

@connect(
	(state) => ({
        
	}), 
	(dispatch) => ({
		
}))
export default class Domain extends BaseComponent {

  constructor(props) {
    super(props);
  }
  //-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-
  //-* component life cycle
  //-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-
  componentWillMount() {
    let me = this;
  }


  render() {
    let me = this;
    return (
      <div>
		{ me.props.children }
      </div>
    );


  }
}

