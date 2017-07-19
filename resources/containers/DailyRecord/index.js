import React from 'react'
import { connect } from 'react-redux';
import { hashHistory } from 'react-router'
import { bindActionCreators } from 'redux'
import BaseComponent from '../BaseComponent.js';
import DailyReocrdMenu from '../Menu/dailyrecordmenu'

// action
import { setDailyRecordMenu } from '../../store/menu/actions';

class DailyRecord extends BaseComponent {

    constructor(props) {
        super(props);
    }

    componentWillMount() {
        let me = this;
        const { menufilter,actions } = me.props;
        actions.setDailyRecordMenu('Page1');
    }

    render() {
        let me = this;
        return (
            <div>
                <div className="span4"><DailyReocrdMenu /></div>
                <div className="span8">main</div>
            </div>
        )
    }
}

export default connect(
    // bind state 将 store 中的数据作为 props 绑定到组件上。
    (state) => ({
        menufilter: state.menufilter
    }),
    // bind dispatch action
    (dispatch) => ({
        actions: bindActionCreators({ setDailyRecordMenu }, dispatch)
    })
)(DailyRecord);
