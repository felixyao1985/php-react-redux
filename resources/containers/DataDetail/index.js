import React from 'react'
import { Link } from 'react-router'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import objectAssign from 'object-assign'
import { SzLib, RcFormUtil } from '../../common'
import BaseComponent from '../BaseComponent.js'

import { getDataDetail, addCount } from '../../store/senior/actions'
import ShowDataDetail from './components/ShowDataDetail'

import './DataDetail.scss'

const images = {
  img: SzLib.loadImage(require('./assets/img.png'))
};

class DataDetail extends BaseComponent {

  static fetchData(params, query) {
    return [getDataDetail(params.id)];
  }

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
    const { data, params: { id } } = me.props;

    if (SzLib.isEmpty(data)
      || !data.dataDetail.hasOwnProperty(id)) {
      this.refreshDataDetail(id);
    } else {
      me.setState(objectAssign({}, me.state, {
        loadEnd: true
      }));
    }

    me.autoAddCount();
  }

  refreshDataDetail(id) {
    let me = this;
    const { actions } = me.props;
    actions.getDataDetail(id)
      .then((res) => RcFormUtil.postPromiseHandler(
        res, null, null,
        () => {
          me.setState(objectAssign({}, me.state, {
            loadEnd: true
          }));
        }
      ));
  }

  autoAddCount() {
    let me = this;
    const { actions } = me.props;
    setTimeout(() => {
      actions.addCount();
      this.autoAddCount();
    }, 10000)
  }

  render() {
    let me = this;
    const { base: { i18n }, data, params: { id }, actions } = me.props;
    const Text = i18n.App[me.getClassName()];

    if (me.state.loadEnd === false || SzLib.isEmpty(data)) {
      return (
        <div>
          <h1>{ Text.Title }</h1>
          <ul>
            Loading...
          </ul>
        </div>
      )
    }

    const dataDetail = data.dataDetail[id];

    return (
      <div>
        <h1 className='detail-title'>{ Text.Title } / Count: { data.count }</h1>
        <ShowDataDetail dataDetail={ dataDetail } />
        <div>
          <Link to="/data">{ Text.Back }</Link>
        </div>
        <img src={ images.img } />
      </div>
    );
  }
}

export default connect(
  // bind state
  (state) => ({
    base: state.base,
    data: state.data
  }),
  // bind dispatch action
  (dispatch) => ({
    actions: bindActionCreators({ getDataDetail, addCount }, dispatch)
  })
)(DataDetail);
