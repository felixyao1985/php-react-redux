import React from 'react'
import { Link,hashHistory } from 'react-router'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import objectAssign from 'object-assign'  //是轻量级 React 类状态更新快捷方式
import { SzLib, RcFormUtil } from '../../common'
import BaseComponent from '../BaseComponent.js'
import withLoading from '../../utils/decorators/withLoading';
import { getDomainList,Clear } from '../../store/domain/actions'
import { Table, Icon, Divider,Button  } from 'antd';

@connect(
	(state) => ({
        domaindata: state.domaindata
	}), 
	(dispatch) => ({
		actions: bindActionCreators({ getDomainList,Clear }, dispatch)
}))
@withLoading(state => {
  //console.log("DomainList @withLoading",state);
  return state.loadEnd == false;
})
export default class DomainList extends BaseComponent {

  constructor(props) {
    super(props);
    this.state = {
      loadEnd: false
    }
	//console.log("DomainList",this.state);
  }
  //-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-
  //-* component life cycle
  //-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-
  //渲染前调用
  componentWillMount() {
    let me = this;
	//console.log("DomainList componentWillMount",this.state);
    const { domaindata: { dataList } } = me.props;

    if (dataList.length == 0) {

		setTimeout(() => {
		  me.refreshDataList();
		}, 5000)
      
    } else {
		me.setState(objectAssign({}, me.state, {
			loadEnd: true
		}));

    }

  }
  
  //组件接收到新的props或者state但还没有render时被调用。在初始化时不会被调用。
  componentWillUpdate() {
	//console.log("DomainList componentWillUpdate",this.state);
  }

  //组件从 DOM 中移除的时候立刻被调用。
  componentWillUnmount() {
	//console.log("DomainList componentWillUnmount",this.state);
	/*
	this.setState({
		loadEnd: false
	});
	*/
    let me = this;
    const { actions } = me.props;
	actions.Clear();
  }


  refreshDataList() {
    let me = this;
    const { actions } = me.props;
    actions.getDomainList()
      .then((res) => RcFormUtil.postPromiseHandler(
        res, null, null,
        () => {
          me.setState(objectAssign({}, me.state, {
            loadEnd: true
          }));
        }
      ));	

  }

  onClickbtnAdd = () => {
    //hashHistory.push('/domain/add');
	this.context.router.push('/domain/add')
  }


  render() {
    let me = this;
    const { domaindata: { dataList } } = me.props;
	

    return (
      <div>
		{ me.props.children }
        <div className="domain-box">
		  <div className="mod-top">
			<ul>
				<li><Button type="primary" onClick={this.onClickbtnAdd}>新增</Button></li>
			</ul>
		  </div>
          { loopDataList() }
        </div>
      </div>
    );

    function loopDataList() {
	  /*
      return dataList.map(
        (value, index) => {
          return (
            <li key={ index }>
              <Link to={`/domain/${value.id}`}>
                { value.id }.{value.name}
              </Link>
            </li>
          );
        }
      );
	  */
		const columns = [{
		  title: 'ID',
		  dataIndex: 'id',
		  key: 'id'
		}, {
		  title: 'Name',
		  dataIndex: 'name',
		  key: 'name',
		  render: text => <a href="javascript:;">{text}</a>,
		}, {
		  title: 'Address',
		  dataIndex: 'address',
		  key: 'address',
		}, {
		  title: 'Action',
		  key: 'action',
		  render: (text, record) => (
			<span>
			  <a href="javascript:;">Action 一 {record.name}</a>
			  <Divider type="vertical" />
			  <a href="javascript:;">Delete</a>
			  <Divider type="vertical" />
			  <a href="javascript:;" className="ant-dropdown-link">
				More actions <Icon type="down" />
			  </a>
			</span>
		  ),
		}];

		return (<Table rowKey={record => record.id}  columns={columns} dataSource={dataList} />)

    }
  }
}

