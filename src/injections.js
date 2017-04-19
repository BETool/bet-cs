/* global document:true */

'use strict';

function tagInjector (c) {
  return (() => {
    const s = document.createElement('script');
    s.type = 'text/javascript';
    s.charset = 'utf-8';
    s.innerHTML = c;
    document.getElementsByTagName('head')[0].appendChild(s);
  });
}

function getInjector (m) {
  if (m.c) {
    return tagInjector(m.c);
  }
}

export function injectRandom (m) {
  const injector = getInjector(m);
  injector();
}

export function injectWithDelay (m) {
  const injector = getInjector(m);
  injector();
}

export function injectImmediately (m) {
  const injector = getInjector(m);
  injector();
}

export function injectDocumentReady (m) {
  const injector = getInjector(m);
  injector();
}
