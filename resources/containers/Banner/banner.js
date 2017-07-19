import React from 'react'
import { hashHistory } from 'react-router'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import BaseComponent from '../BaseComponent.js'
import './style.css';

class Banner extends BaseComponent {


    constructor(props) {
        super(props);
    }





    render() {
        let me = this;
        const {title, logininfo } = me.props;
		console.log('banner me.props',me.props);
        function handleClick() {

        }

        return (
            <div>
                <div className="banner">
                    <div className="banner-logo"></div>
					<div className="banner-title">{title}{logininfo.domainName}</div>
					<div className="banner-option"></div>
                </div>

            </div>
        );
    };


}

export default connect(
    // bind state
    (state) => ({
        logininfo: state.logininfo
    }),
    // bind dispatch action
    (dispatch) => ({
       
    })
)(Banner);