import React from 'react'
import { routerShape } from 'react-router'
import { SzLib } from '../common';

class BaseComponent extends React.Component {

  getClassName() {
    return this.constructor.name
  }

  Log(msg) {
    SzLib.log('-----------[component:' + this.getClassName() + ' start]-----------');
    SzLib.log(msg);
    SzLib.log('-----------[component:' + this.getClassName() + ' end]-----------');
  }
}

BaseComponent.contextTypes = {
  router: routerShape.isRequired
};

export default BaseComponent;