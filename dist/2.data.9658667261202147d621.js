webpackJsonp([2],{212:function(module,exports,__webpack_require__){"use strict";function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{default:obj}}function setDailyRecordMenu(filter){return{type:_const2.default.SET_DailyRecordMenu,filter:filter}}Object.defineProperty(exports,"__esModule",{value:!0}),exports.setDailyRecordMenu=setDailyRecordMenu;var _const=__webpack_require__(213),_const2=_interopRequireDefault(_const)},213:function(module,exports){"use strict";Object.defineProperty(exports,"__esModule",{value:!0});var SUFFIX="BASE:";exports.default={SEND:SUFFIX+"SEND",SUCCESS:SUFFIX+"SUCCESS",ERROR:SUFFIX+"ERROR",FAIL:SUFFIX+"FAIL",SET_DailyRecordMenu:SUFFIX+"SET_DailyRecordMenu"}},333:function(module,exports,__webpack_require__){"use strict";function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{default:obj}}Object.defineProperty(exports,"__esModule",{value:!0});var _getPrototypeOf=__webpack_require__(42),_getPrototypeOf2=_interopRequireDefault(_getPrototypeOf),_classCallCheck2=__webpack_require__(30),_classCallCheck3=_interopRequireDefault(_classCallCheck2),_createClass2=__webpack_require__(36),_createClass3=_interopRequireDefault(_createClass2),_possibleConstructorReturn2=__webpack_require__(44),_possibleConstructorReturn3=_interopRequireDefault(_possibleConstructorReturn2),_inherits2=__webpack_require__(43),_inherits3=_interopRequireDefault(_inherits2),_react=__webpack_require__(7),_react2=_interopRequireDefault(_react),_reactRedux=__webpack_require__(62),_redux=(__webpack_require__(47),__webpack_require__(48)),_BaseComponent2=__webpack_require__(57),_BaseComponent3=_interopRequireDefault(_BaseComponent2),_dailyrecordmenu=__webpack_require__(340),_dailyrecordmenu2=_interopRequireDefault(_dailyrecordmenu),_actions=__webpack_require__(212),DailyRecord=function(_BaseComponent){function DailyRecord(props){return(0,_classCallCheck3.default)(this,DailyRecord),(0,_possibleConstructorReturn3.default)(this,(DailyRecord.__proto__||(0,_getPrototypeOf2.default)(DailyRecord)).call(this,props))}return(0,_inherits3.default)(DailyRecord,_BaseComponent),(0,_createClass3.default)(DailyRecord,[{key:"componentWillMount",value:function(){var me=this,_me$props=me.props,actions=(_me$props.menufilter,_me$props.actions);actions.setDailyRecordMenu("Page1")}},{key:"render",value:function(){return _react2.default.createElement("div",null,_react2.default.createElement("div",{className:"span4"},_react2.default.createElement(_dailyrecordmenu2.default,null)),_react2.default.createElement("div",{className:"span8"},"main"))}}]),DailyRecord}(_BaseComponent3.default);exports.default=(0,_reactRedux.connect)(function(state){return{menufilter:state.menufilter}},function(dispatch){return{actions:(0,_redux.bindActionCreators)({setDailyRecordMenu:_actions.setDailyRecordMenu},dispatch)}})(DailyRecord)},339:function(module,exports){"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.default={Page1:"页面1",Page2:"页面2",Page3:"页面3",Page4:"页面4"}},340:function(module,exports,__webpack_require__){"use strict";function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{default:obj}}Object.defineProperty(exports,"__esModule",{value:!0});var _getPrototypeOf=__webpack_require__(42),_getPrototypeOf2=_interopRequireDefault(_getPrototypeOf),_classCallCheck2=__webpack_require__(30),_classCallCheck3=_interopRequireDefault(_classCallCheck2),_createClass2=__webpack_require__(36),_createClass3=_interopRequireDefault(_createClass2),_possibleConstructorReturn2=__webpack_require__(44),_possibleConstructorReturn3=_interopRequireDefault(_possibleConstructorReturn2),_inherits2=__webpack_require__(43),_inherits3=_interopRequireDefault(_inherits2),_react=__webpack_require__(7),_react2=_interopRequireDefault(_react),_reactRedux=(__webpack_require__(47),__webpack_require__(62)),_redux=__webpack_require__(48),_BaseComponent2=__webpack_require__(57),_BaseComponent3=_interopRequireDefault(_BaseComponent2),_const=__webpack_require__(339),_const2=_interopRequireDefault(_const);__webpack_require__(604);var _actions=__webpack_require__(212),DailyReocrdMenu=function(_BaseComponent){function DailyReocrdMenu(props){return(0,_classCallCheck3.default)(this,DailyReocrdMenu),(0,_possibleConstructorReturn3.default)(this,(DailyReocrdMenu.__proto__||(0,_getPrototypeOf2.default)(DailyReocrdMenu)).call(this,props))}return(0,_inherits3.default)(DailyReocrdMenu,_BaseComponent),(0,_createClass3.default)(DailyReocrdMenu,[{key:"componentWillMount",value:function(){var me=this,_me$props=me.props;_me$props.menufilter,_me$props.actions}},{key:"render",value:function(){function handleClick(e,_key){console.log(e),console.log(_key)}function loopDataList(filter){var ret=[];for(var _key in _const2.default){var item=_const2.default[_key];ret.push(_react2.default.createElement("li",{key:"daily-record-menu"+_key,className:filter==_key?null:focus,onClick:function(){return handleClick(_key)}},item))}return ret}var me=this,_me$props2=me.props,menufilter=_me$props2.menufilter;_me$props2.actions;return _react2.default.createElement("div",null,_react2.default.createElement("div",{className:"menu daily-record-menu"},loopDataList(menufilter)))}}]),DailyReocrdMenu}(_BaseComponent3.default);exports.default=(0,_reactRedux.connect)(function(state){return{menufilter:state.menufilter}},function(dispatch){return{actions:(0,_redux.bindActionCreators)({setDailyRecordMenu:_actions.setDailyRecordMenu},dispatch)}})(DailyReocrdMenu)},349:function(module,exports,__webpack_require__){"use strict";function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{default:obj}}Object.defineProperty(exports,"__esModule",{value:!0}),exports.default=function(){var state=arguments.length>0&&void 0!==arguments[0]?arguments[0]:initialState,action=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{};switch(action.type){case _const2.default.SET_DailyRecordMenu:return(0,_objectAssign2.default)({},state,{filter:action.filter});case _const2.default.ERROR:return state;case _const2.default.FAIL:return console.log("ERROR:"+action.error),state;default:return state}};var _objectAssign=__webpack_require__(6),_objectAssign2=_interopRequireDefault(_objectAssign),_const=(__webpack_require__(79),__webpack_require__(213)),_const2=_interopRequireDefault(_const),isNode=(new Date,"undefined"==typeof window),initialState=!isNode&&window.__INITIAL_STATE__.hasOwnProperty("menu")?window.__INITIAL_STATE__.menu:{filter:null}},604:601});