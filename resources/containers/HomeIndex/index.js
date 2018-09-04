import React from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { SzLib } from '../../common';
import BaseComponent from '../BaseComponent.js';
import objectAssign from 'object-assign';
import withLoading from '../../utils/decorators/withLoading';
import './style.css';

@connect((state) => ({
		
	}), 
	(dispatch) => ({
		
	}))
@withLoading(state => {
  return state.loadEnd == false;
})
export default class HomeIndex extends BaseComponent {

  constructor(props) {
    super(props);
    this.state = {
      loadEnd: false
    }
  }

  render() {
    let me = this;
    setTimeout(() => {
	  me.setState(objectAssign({}, me.state, {
		loadEnd: true
	  }));
    }, 10000)
		

    return (
      <div>
        <h1>首页</h1>
		<div><img src={require("./img/Group@2x.png")}></img></div>
		<div className="HomeIndex"></div>
		<div><img src={require("../../public/img/img.png")}></img></div>
      </div>
    );
  }
}

//export default connect()(HomeIndex);