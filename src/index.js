/* global window:true top:true */

'use strict';

import BetConnector from 'bet-connector';

class BetContentScript {

  constructor () {
    this.dealer = new BetConnector('chrome');
  }

  load () {
    console.log('load');
    this.dealer.send(
      {
        type: 'GET_MODULES',
        payload: this.pageInfo(),
      },
      info => console.log('GET_MODULES', info),
    );
  }

  pageInfo () {
    return {
      host: window.document.location.hostname,
      url: window.document.location.href,
      isFrame: (window !== top),
    };
  }
}

export default BetContentScript;
