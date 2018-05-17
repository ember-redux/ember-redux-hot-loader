import { test, module } from 'qunit';
import { setupTest } from 'ember-qunit';
import Service from '@ember/service';

let unseen = [], nextReducer;
window.requirejs.unsee = (moduleName) => {
  unseen.push(moduleName);
};

module('Unit | Services | hot reload', function(hooks) {
  setupTest(hooks);

  hooks.beforeEach(function() {
    unseen = [];
    nextReducer = null;
    this.owner.register('service:redux', Service.extend({
      replaceReducer(reducer) {
        nextReducer = reducer;
      }
    }));
  });

  test('will cancel the live reload when path includes named reducer', async function(assert) {
    const service = this.owner.lookup('service:hotReload');
    const event = {
      cancel: false,
      modulePath: 'todomvc/app/reducers/todos.js'
    };
    service.confirmLiveReload(event);
    assert.ok(event.cancel);
    assert.deepEqual(unseen, [
      'dummy/reducers/todos',
      'dummy/reducers/index'
    ]);
  });

  test('will cancel the live reload when path is reducer ending with index', async function(assert) {
    const service = this.owner.lookup('service:hotReload');
    const event = {
      cancel: false,
      modulePath: 'todomvc/app/reducers/todos/index.js'
    };
    service.confirmLiveReload(event);
    assert.ok(event.cancel);
    assert.deepEqual(unseen, [
      'dummy/reducers/todos/index',
      'dummy/reducers/index'
    ]);
  });

  test('will cancel the live reload when path is very nested reducer', async function(assert) {
    const service = this.owner.lookup('service:hotReload');
    const event = {
      cancel: false,
      modulePath: 'todomvc/app/reducers/todos/foo/bar/baz.js'
    };
    service.confirmLiveReload(event);
    assert.ok(event.cancel);
    assert.deepEqual(unseen, [
      'dummy/reducers/todos/foo/bar/baz',
      'dummy/reducers/index'
    ]);
  });

  test('will not cancel the live reload when path is selector nested within reducers folder', async function(assert) {
    const service = this.owner.lookup('service:hotReload');
    const event = {
      cancel: false,
      modulePath: 'todomvc/app/reducers/todos/selectors.js'
    };
    service.confirmLiveReload(event);
    assert.notOk(event.cancel);
    assert.deepEqual(unseen, []);
  });

  test('will not cancel the live reload when path is selector folder nested within reducers folder', async function(assert) {
    const service = this.owner.lookup('service:hotReload');
    const event = {
      cancel: false,
      modulePath: 'todomvc/app/reducers/todos/selectors/index.js'
    };
    service.confirmLiveReload(event);
    assert.notOk(event.cancel);
    assert.deepEqual(unseen, []);
  });

  test('will not cancel the live reload when path is selector', async function(assert) {
    const service = this.owner.lookup('service:hotReload');
    const event = {
      cancel: false,
      modulePath: 'todomvc/app/selectors/todos.js'
    };
    service.confirmLiveReload(event);
    assert.notOk(event.cancel);
    assert.deepEqual(unseen, []);
  });

  test('will replaceReducer when path includes named reducer', async function(assert) {
    const service = this.owner.lookup('service:hotReload');
    service.attemptLiveReload('todomvc/app/reducers/todos.js');
    assert.deepEqual(nextReducer, {});
  });

  test('will replaceReducer when path is reducer ending with index', async function(assert) {
    const service = this.owner.lookup('service:hotReload');
    service.attemptLiveReload('todomvc/app/reducers/todos/index.js');
    assert.deepEqual(nextReducer, {});
  });

  test('will replaceReducer when path is very nested reducer', async function(assert) {
    const service = this.owner.lookup('service:hotReload');
    service.attemptLiveReload('todomvc/app/reducers/todos/foo/bar/baz.js');
    assert.deepEqual(nextReducer, {});
  });

  test('will not replaceReducer when path is selector nested within reducers folder', async function(assert) {
    const service = this.owner.lookup('service:hotReload');
    service.attemptLiveReload('todomvc/app/reducers/todos/selectors.js');
    assert.deepEqual(nextReducer, null);
  });

  test('will not replaceReducer when path is selector folder nested within reducers folder', async function(assert) {
    const service = this.owner.lookup('service:hotReload');
    service.attemptLiveReload('todomvc/app/reducers/todos/selectors/index.js');
    assert.deepEqual(nextReducer, null);
  });

  test('will not replaceReducer when path is selector', async function(assert) {
    const service = this.owner.lookup('service:hotReload');
    service.attemptLiveReload('todomvc/app/selectors/todos.js');
    assert.deepEqual(nextReducer, null);
  });
});
