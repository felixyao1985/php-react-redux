import React, {Component} from 'react';
import {Spin} from 'antd';
export default function withLoading(loadingCheck) {
  return function (WrappedComponent) {
    return class HOC extends WrappedComponent {
      componentWillUpdate(nextProps, nextState) {
      }
      render() {
        if (loadingCheck(this.state)) {
          return <Spin tip="加载中" size="large">
            {super.render()}
          </Spin>
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