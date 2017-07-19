import React from 'react'
import { Link } from 'react-router'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { SzLib } from '../../common';
import BaseComponent from '../BaseComponent.js'


class HomeIndex extends BaseComponent {

  constructor(props) {
    super(props);
  }

  render() {
    let me = this;
	
    return (
      <div>
        <h1>首页</h1>
      
      </div>
    );
  }
}

export default connect()(HomeIndex);