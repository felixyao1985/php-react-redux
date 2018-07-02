import React from 'react'
import { hashHistory } from 'react-router'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import BaseComponent from '../BaseComponent.js'
import CONST from './const.js';
import './style.css';
// action
import { setDailyRecordMenu } from '../../store/menu/actions';
import { Menu, Icon } from 'antd';
const SubMenu = Menu.SubMenu;

@connect(
	(state) => ({
        menufilter: state.menufilter
	}), 
	(dispatch) => ({
		actions: bindActionCreators({ setDailyRecordMenu }, dispatch)
}))
export default class DailyReocrdMenu extends BaseComponent {

    constructor(props) {
        super(props);
    }

    componentWillMount() {
        let me = this;
        const { menufilter,actions } = me.props;
    }

    render() {
        let me = this;
        const { menufilter,actions,handleClick } = me.props;

        function loopDataList(filter){
            var ret = [];
            for(var _key in CONST){
                var item = CONST[_key];
                ret.push(
					<Menu.Item key={"daily-record-menu" + _key} className={`${filter== _key ? 'focus' : ''}`} onClick={handleClick.bind(this,_key,item)}>
						<Icon type="pie-chart" />
						<span>{item}</span>
					</Menu.Item>
                );
            }
            return ret;
        }

        return (
            <div className="menu daily-record-menu" >
				  
				<Menu
				  defaultSelectedKeys={['6']}
				  defaultOpenKeys={['sub1']}
				  mode="inline"
				  theme="dark"
				>

				  { loopDataList(menufilter.filter) }
				  <SubMenu key="sub1" title={<span><Icon type="mail" /><span>Navigation One</span></span>}>
					<Menu.Item key="5">Option 5</Menu.Item>
					<Menu.Item key="6">Option 6</Menu.Item>
					<Menu.Item key="7">Option 7</Menu.Item>
					<Menu.Item key="8">Option 8</Menu.Item>
				  </SubMenu>
				  <SubMenu key="sub2" title={<span><Icon type="appstore" /><span>Navigation Two</span></span>}>
					<Menu.Item key="9">Option 9</Menu.Item>
					<Menu.Item key="10">Option 10</Menu.Item>
					<SubMenu key="sub3" title="Submenu">
					  <Menu.Item key="11">Option 11</Menu.Item>
					  <Menu.Item key="12">Option 12</Menu.Item>
					</SubMenu>
				  </SubMenu>
				</Menu>

            </div>
        );
    };


}

/*
export default connect(
    // bind state
    (state) => ({
        menufilter: state.menufilter
    }),
    // bind dispatch action
    (dispatch) => ({
        actions: bindActionCreators({ setDailyRecordMenu }, dispatch)
    })
)(DailyReocrdMenu);
*/