import React from 'react'
import { Link } from 'react-router'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import objectAssign from 'object-assign'  //是轻量级 React 类状态更新快捷方式
import { SzLib, RcFormUtil } from '../../common'
import BaseComponent from '../BaseComponent.js'

import { getSeniorList } from '../../store/senior/actions'

import './Senior.css'

class Senior extends BaseComponent {

  constructor(props) {
    super(props);
    this.state = {
      loadEnd: false
    }
  }
  //-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-
  //-* component life cycle
  //-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-
  componentWillMount() {
    let me = this;
	/*
    const { data: { dataList } } = me.props;

    if (dataList.length == 0) {
      //this.refreshDataList();
    } else {
      me.setState(objectAssign({}, me.state, {
        loadEnd: true
      }));
    }
	*/
  }

  refreshDataList() {
    let me = this;
    const { actions } = me.props;
    actions.getDataList()
      .then((res) => RcFormUtil.postPromiseHandler(
        res, null, null,
        () => {
          me.setState(objectAssign({}, me.state, {
            loadEnd: true
          }));
        }
      ));
  }

  render() {
    let me = this;
    //const { data: { dataList } } = me.props;
    const Text = "请选择照护服务对象开始今日记录";
    const title = "上海市田林社区爱照护长者照护之家 • 每日照护记录";
	
    if (me.state.loadEnd == false) {
      return (
        <div>
		  <div className="senior-box">
			  <ul>
				Loading...
			  </ul>		  
			</div>
        </div>
      )
    }

    return (
      <div>
        <h1 className="title">{ Text.Title }</h1>
        <div className="senior-box">
          { loopDataList() }
        </div>
      </div>
    );

    function loopDataList() {
	  return (
		<li >
		  123
		</li>
	  );
		/*
      return dataList.map(
        (value, index) => {
          return (
            <li key={ index }>
              <Link to={`/data/${value.id}`}>
                { value.id }.{value.name}
              </Link>
            </li>
          );
        }
      );
	  */
    }
  }
}

export default connect(
  // bind state
  (state) => ({
    seniordata: state.seniordata
  }),
  // bind dispatch action
  (dispatch) => ({
    actions: bindActionCreators({ getSeniorList }, dispatch)
  })
)(Senior);
