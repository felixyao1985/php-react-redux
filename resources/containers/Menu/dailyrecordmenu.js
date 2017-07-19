import React from 'react'
import { hashHistory } from 'react-router'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import BaseComponent from '../BaseComponent.js'
import CONST from './const.js';
import './style.css';
// action
import { setDailyRecordMenu } from '../../store/menu/actions';

class DailyReocrdMenu extends BaseComponent {



    constructor(props) {
        super(props);
    }

    componentWillMount() {
        let me = this;
        const { menufilter,actions } = me.props;
    }



    render() {
        let me = this;
        const { menufilter,actions } = me.props;

        function handleClick(e,_key) {
            console.log(e);
            console.log(_key)
        }

        function loopDataList(filter){
            var ret = [];
            for(var _key in CONST){
                var item = CONST[_key];
                ret.push(
                    <li key={"daily-record-menu" + _key}  className={filter== _key ? null : focus} onClick={() => handleClick(_key)}>{item}</li>
                );
            }
            return ret;

        }

        return (
            <div>
                <div className="menu daily-record-menu">
                    { loopDataList(menufilter) }
                </div>

            </div>
        );
    };


}

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