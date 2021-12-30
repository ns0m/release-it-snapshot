const test = require('bron');
const assert = require('assert').strict;
const sinon = require('sinon');
const { factory } = require('release-it/test/util');
const Plugin = require('.');
const VersionPlugin = require('release-it/lib/plugin/version/Version');

test('isEnabled true', () => {
  assert.equal(Plugin.isEnabled(), true);
});

test('isEnabled false if options=false', () => {
  assert.equal(Plugin.isEnabled(false), false);
});

const superIncrementVersionStubReturns = (value) => {
  if (!this.superIncrementVersionStub) {
    this.superIncrementVersionStub = sinon.stub(VersionPlugin.prototype, 'incrementVersion');
    this.superIncrementVersionStubCallCount = 0;
  }
  this.superIncrementVersionStub.onCall(this.superIncrementVersionStubCallCount++).returns(value);
};

test('incrementVersion null', () => {
  const plugin = factory(Plugin);
  superIncrementVersionStubReturns(undefined);
  assert.equal(plugin.incrementVersion(), null);
  superIncrementVersionStubReturns('1.2.4');
  assert.equal(plugin.incrementVersion(), null);
  superIncrementVersionStubReturns('1.2.4-beta');
  assert.equal(plugin.incrementVersion(), null);
  superIncrementVersionStubReturns('1.2.4-alpha.beta-0');
  assert.equal(plugin.incrementVersion(), null);
});

test('incrementVersion snapshot', () => {
  const plugin = factory(Plugin);
  superIncrementVersionStubReturns('1.2.4-0');
  assert.equal(plugin.incrementVersion(), '1.2.4-SNAPSHOT');
  superIncrementVersionStubReturns('1.2.4-beta.0');
  assert.equal(plugin.incrementVersion(), '1.2.4-beta');
});
