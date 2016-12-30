/*
  Not functional yet due to reliance upon 
  browser-specific localStorage implementation.
*/

'use strict';

let test = require('tape');
let LocalStore = require('./localStore');

test('getAll() test', t => {
  t.plan(1);
  let store = new LocalStore('test');
  t.equal(store.getAll(), []);
});

test('setAll() test', t => {
  t.plan(1);
  let store = new LocalStore('test');
  store.setAll([1,2,3]);
  t.equal(store.getAll(), [1,2,3]);
});

test('addItem(item) test', t => {
  t.plan(1);
  let store = new LocalStore('test');
  store.addItem({});
  t.equal(store.getAll(), [{}]);
});

test('removeItem(item) test', t => {
  t.plan(1);
  let store = new LocalStore('test');
  store.addItem({});
  store.removeItem({});
  t.equal(store.removeItem({}), []);
});