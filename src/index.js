/* global window:true top:true */

'use strict';

import BetConnector from 'bet-connector';
import {
  injectRandom,
  injectWithDelay,
  injectImmediately,
  injectDocumentReady,
} from './injections';

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
      (response) => {
        console.log('GET_MODULES', response);
        if (
          response
          &&
          false === response.err
          &&
          response.value
          &&
          Array.isArray(response.value.payload)
        ) {
          this.inject(response.value.payload);
        }
      },
    );
  }

  inject (src) {
    src.forEach((m) => {
      switch (m.r) {
        case 0: // dom
          return injectDocumentReady(m);
        case 1: // now
          return injectImmediately(m);
        default: // delay & rnd
          if (`${m.r}`.match(/\./)) {
            return injectRandom(m);
          }
          return injectWithDelay(m);
      }
    });
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
