'use strict';

import BetConnector from 'bet-connector';

class BetContentScript {

  constructor (app) {
    app = app || {};
    this.dealer = new BetConnector('chrome');
  }

  load () {
    console.log('load');
    this.dealer.send('Hello', info => console.log('info', info));
  }
};

export default BetContentScript;
