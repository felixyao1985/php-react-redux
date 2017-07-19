import React, { PropTypes } from 'react'
import BaseComponent from '../../BaseComponent.js'

class ShowDataDetail extends BaseComponent {

  constructor(props) {
    super(props);
    this.state = {
      childCount: 0
    }
  }

  componentWillMount() {
    let me = this;
    me.autoAddCount();
  }

  autoAddCount() {
    let me = this;
    setTimeout(() => {
      me.setState({
        childCount: me.state.childCount + 1
      });
      me.autoAddCount();
    }, 1000)
  }

  render() {
    let me = this;
    const { dataDetail } = me.props;

    return (
      <div>
        <div>
          <div>id:{ dataDetail.id }</div>
          <div>name:{ dataDetail.name }</div>
          <div>message:{ dataDetail.message }</div>
          <div>memo:{ dataDetail.memo }</div>
          <div>count:{ me.state.childCount }</div>
        </div>
      </div>
    );
  }
}

ShowDataDetail.propTypes = {
  dataDetail:  React.PropTypes.shape({
    id:       React.PropTypes.number,
    name:     React.PropTypes.string,
    message:  React.PropTypes.string,
    memo:     React.PropTypes.string
  })
};

export default ShowDataDetail;
