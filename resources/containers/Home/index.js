import React from 'react'
import { connect } from 'react-redux';
import { hashHistory } from 'react-router'
import { bindActionCreators } from 'redux'
import { SzLib, Configs } from '../../common';
import BaseComponent from '../BaseComponent.js';

// action
import { getLoginInfo } from '../../store/logininfo/actions';

class Home extends BaseComponent {

  constructor(props) {
    super(props);
  }

  componentWillMount() {
    let me = this;
    const { actions } = me.props;
    actions.getLoginInfo()
        .then((res) => {
				//console.log('res',res);
                if (res.response.code == 0) {
                    hashHistory.push('/senior');
                }
            }
		).catch((error) => {
			console.log('LoginInfo','error');
		});
  }

  componentWillUpdate() {
    let me = this;
    const { actions } = me.props;
    actions.getLoginInfo()
        .then((res) => {
                if (res.response.code == 1) {
                    hashHistory.push('/');
                }
            }
		).catch((error) => {
			console.log('LoginInfo','error');
		});
  }

  render() {
    let me = this;
    return (
      <div className="full-screen">
        { me.props.children }
      </div>
    )
  }
}

export default connect(
  // bind state 将 store 中的数据作为 props 绑定到组件上。
  (state) => ({
    logininfo: state.logininfo
  }),
  // bind dispatch action
  (dispatch) => ({
    actions: bindActionCreators({ getLoginInfo }, dispatch)
  })
)(Home);
