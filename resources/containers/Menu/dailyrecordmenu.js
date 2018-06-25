import React from 'react'
import { hashHistory } from 'react-router'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import BaseComponent from '../BaseComponent.js'
import CONST from './const.js';
import './style.css';
// action
import { setDailyRecordMenu } from '../../store/menu/actions';

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
		console.log('DailyReocrdMenu.me',me);
        const { menufilter,actions,handleClick } = me.props;

        function loopDataList(filter){
            var ret = [];
            for(var _key in CONST){
                var item = CONST[_key];
                ret.push(
                    <li key={"daily-record-menu" + _key}  className={`${filter== _key ? 'focus' : ''}`} onClick={handleClick.bind(this,_key,item)}>{_key}{item}</li>
                );
            }
            return ret;
        }

        return (
            <div>
                <div className="menu daily-record-menu">
                    { loopDataList(menufilter.filter) }
                </div>

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