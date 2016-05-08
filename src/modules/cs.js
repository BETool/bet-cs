import Logger from 'bet-logger';
import Crex from '../..';


const log = new Logger(`Brex:cs:${window.location.hostname}`);

if(chrome.runtime.onMessage) {
  log('cs script start');

  var crex = new Crex({
    pluginId: "plugin1"
  });

  crex.load();
}
