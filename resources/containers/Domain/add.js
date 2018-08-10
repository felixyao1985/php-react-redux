import React from 'react'
import { Link } from 'react-router'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import objectAssign from 'object-assign'  //是轻量级 React 类状态更新快捷方式
import { SzLib, RcFormUtil } from '../../common'
import BaseComponent from '../BaseComponent.js'
import withLoading from '../../utils/decorators/withLoading';
import { getDomainList } from '../../store/domain/actions'
import { Table, Icon, Divider,Button } from 'antd';

@connect(
	(state) => ({
        domaindata: state.domaindata
	}), 
	(dispatch) => ({
		actions: bindActionCreators({ getDomainList }, dispatch)
}))
export default class DomainAdd extends BaseComponent {

  constructor(props) {
    super(props);
  }
  //-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-
  //-* component life cycle
  //-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-
  componentWillMount() {
    let me = this;
  }

  onClickbtnAdd = () => {
    hashHistory.push('/domain/add');
  }

  render() {
    let me = this;
    const { domaindata: { dataList } } = me.props;
	

    return (
      <div>
        <div className="domain-box">
		  <div className="mod-top">
			<ul>
				<li>ADD</li>
			</ul>
		  </div>
        </div>
      </div>
    );

  }
}

