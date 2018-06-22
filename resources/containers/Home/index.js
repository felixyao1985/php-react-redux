import React from 'react'
import { connect } from 'react-redux';
import { hashHistory } from 'react-router'
import { bindActionCreators } from 'redux'
import { SzLib, Configs } from '../../common';
import objectAssign from 'object-assign';
import BaseComponent from '../BaseComponent.js';
import { Layout} from 'antd';
import DailyReocrdMenu from '../Menu/dailyrecordmenu'
import Banner from '../Banner/banner'
// action
import { setDailyRecordMenu } from '../../store/menu/actions';
import { getLoginInfo } from '../../store/userinfo/actions';
import './style.scss';
class Home extends BaseComponent {

  constructor(props) {
    super(props);
    this.state = {
      title: "home"
    }
  }

  componentWillMount() {
    let me = this;
    const { actions } = me.props;
	//console.log('Home componentWillMount',me);
    actions.getLoginInfo()
        .then((res) => {
                if (res.response.code == 0) {
					hashHistory.push('/home');
                }else{
					hashHistory.push('/login');
				}
            }
		).catch((error) => {
			//console.log('home LoginInfo','error');
			hashHistory.push('/login');
		});
  }

  componentWillUpdate() {
    let me = this;
    const { actions } = me.props;
	//console.log('Home componentWillUpdate',me);
    actions.getLoginInfo()
        .then((res) => {
                if (res.response.code == 1) {
                    hashHistory.push('/login');
                }
            }
		).catch((error) => {
			hashHistory.push('/login');
			//console.log('home LoginInfo','error');
		});
  }

  render() {
    let me = this;
	const { actions } = me.props;
	const { Header, Sider, Content } = Layout;
	//console.log('Home render',me);
	function handleClick(_key,_item,e) {
		console.log(_key);
		actions.setDailyRecordMenu(_key);
		//hashHistory.push('/'+_key);
		me.setState(objectAssign({}, me.state, {
			title: _item
		}));
	}
	/*
		<div className="full-screen clearfix">
			<div className="banner"><Banner title={me.state.title}/></div>
			<div className="body-screen">
				<div className="menu"><DailyReocrdMenu handleClick={handleClick}/></div>
				<div className="main-screen">{ me.props.children }</div>
			</div>
		</div>	
	*/
	


    return (
		<Layout style={{height: '100%',color: 'red'}}>
		  <Header><Banner title={me.state.title}/></Header>
		  <Layout>
			<Sider><DailyReocrdMenu handleClick={handleClick}/></Sider>
			<Content>{ me.props.children }</Content>
		  </Layout>
		</Layout>
    )
  }
}

export default connect(
  /* 
	bind state 将 store 中的数据作为 props 绑定到组件上。
	使用AAA:state.BBB 确保和store中数据绑定的名称一致
	其中AAA 名称可随意，但是为了保证可阅读性 和BBB名字确保一直
	其中BBB 的名称 必须和router.js 中store绑定的key名一直
  */
  (state) => ({
		title: state.title
  }),
  // bind dispatch action
  (dispatch) => ({
    actions: bindActionCreators({ getLoginInfo,setDailyRecordMenu }, dispatch)
  })
)(Home);
