import React, {Component} from 'react';
import {Spin} from 'antd';
export default function withLoading(loadingCheck) {
  return function (WrappedComponent) {
    return class HOC extends WrappedComponent {
      componentWillUpdate(nextProps, nextState) {
      }
      render() {

		var styleObj = {
			position:"absolute",
			top:"30%",
			left:"50%"
		}

        if (loadingCheck(this.state)) {
          return <div><div style={styleObj}><Spin tip="加载中" size="large" wrapperClassName="withLoading"></Spin></div>
			     {super.render()}</div>
        } else {
          return <div >
			<WrappedComponent {...this.props}/>
          </div>
        }
      }
    }
  }
}
/*
// 使用
@withLoading(props => {
  return props.IndexStore.accountList.length == 0;
})
*/