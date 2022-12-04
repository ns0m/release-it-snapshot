import assert from 'assert/strict';
import test from 'bron';
import Version from 'release-it/customExport_lib-plugin-version-Version.js';
import { factory } from 'release-it/test/util/index.js';
import sinon from 'sinon';
import SnapshotPreReleaseVersionPlugin from './index.js';

test('isEnabled true', () => {
  assert.equal(SnapshotPreReleaseVersionPlugin.isEnabled(), true);
});

test('isEnabled false if options=false', () => {
  assert.equal(SnapshotPreReleaseVersionPlugin.isEnabled(false), false);
});

const superIncrementVersionStubReturns = (plugin, value) => {
  if (!plugin.superIncrementVersionStub) {
    sinon.restore();
    plugin.superIncrementVersionStub = sinon.stub(Version.prototype, 'incrementVersion');
    plugin.superIncrementVersionStubCallCount = 0;
  }
  plugin.superIncrementVersionStub.onCall(plugin.superIncrementVersionStubCallCount++).returns(value);
};

test('incrementVersion null', () => {
  const plugin = factory(SnapshotPreReleaseVersionPlugin);
  superIncrementVersionStubReturns(plugin, undefined);
  assert.equal(plugin.incrementVersion(), null);
  superIncrementVersionStubReturns(plugin, '1.2.4');
  assert.equal(plugin.incrementVersion(), null);
  superIncrementVersionStubReturns(plugin, '1.2.4-beta');
  assert.equal(plugin.incrementVersion(), null);
  superIncrementVersionStubReturns(plugin, '1.2.4-alpha.beta-0');
  assert.equal(plugin.incrementVersion(), null);
});

test('incrementVersion snapshot', () => {
  const plugin = factory(SnapshotPreReleaseVersionPlugin);
  superIncrementVersionStubReturns(plugin, '1.2.4-0');
  assert.equal(plugin.incrementVersion(), '1.2.4-SNAPSHOT');
  superIncrementVersionStubReturns(plugin, '1.2.4-beta.0');
  assert.equal(plugin.incrementVersion(), '1.2.4-beta');
});
