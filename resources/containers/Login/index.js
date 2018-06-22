import React from 'react'
import { Link,hashHistory } from 'react-router'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { SzLib,MD5 } from '../../common';
import BaseComponent from '../BaseComponent.js'
import objectAssign from 'object-assign'  //是轻量级 React 类状态更新快捷方式
import './style.scss';
// action
import { getLoginInfo,setLoginInfo } from '../../store/userinfo/actions';

class Login extends BaseComponent {

 

  constructor(props) {
    super(props);
    this.state = {
      login: false
    }
  }
 
  componentWillMount() {
    let me = this;
    const { actions } = me.props;

	actions.getLoginInfo()
    .then((res) => {
            if (res.response.code == 0) {
                hashHistory.push('/');
            }
        }
    );
  }



  render() {
      let me = this;
      const {userinfo, actions} = me.props;
      let usename;
      let pwd;
      console.log('login userinfo', userinfo);
      function handleClick(e) {
          actions.setLoginInfo(usename.value.trim(), MD5(pwd.value.trim()), true)
              .then((res) => {
                      if (res.response.code == 0) {
                          me.setState(objectAssign({}, me.state, {
                              login: true
                          }));
                      }
                  }
              );
      }

      if (me.state.login) {
          hashHistory.push('/');
      } else {
          return (
              <div className="full-screen">
                  <div id="mol-login">
                      <div className="title">【用户登录】后台管理系统</div>
                      <div className="container">
                          <div className="login-logo"><img src={require("./img/Group@2x.png")}></img></div>
                          <div className="login-box">
                              <input placeholder="用户名" ref={r => usename = r} type="text" id="Username" name="Username"
                                     className="formText" size="20"/>

                              <input placeholder="密码" ref={r => pwd = r} type="password" id="Password" name="Password"
                                     className="formText" size="20"/>

                              <button className="button " onClick={ (e) => handleClick(e) } name="Send" id="btnSend">
                                  立即登录
                              </button>
                          </div>
                      </div>
                  </div>

              </div>
          );
      }


  }
}

export default connect(
  // bind state
  (state) => ({
    userinfo: state.userinfo
  }),
  // bind dispatch action
  (dispatch) => ({
    actions: bindActionCreators({ getLoginInfo,setLoginInfo }, dispatch)
  })
)(Login);