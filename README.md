# Snapshot pre-release version write plugin for release-it [![Latest Published Version](https://img.shields.io/npm/v/release-it-snapshot-prerelease-version)](https://www.npmjs.com/package/release-it-snapshot-prerelease-version) ![Coverage](https://img.shields.io/badge/coverage-100%25-success)

This [release-it plugin](https://github.com/release-it/release-it/blob/master/docs/plugins.md) overrides the **next** version
in case it is a [pre-release](https://semver.org/#spec-item-9) to match with [Snapshot logic](https://maven.apache.org/guides/getting-started/index.html#What_is_a_SNAPSHOT_version).

It will force the pre-release identifier to `SNAPSHOT` instead of the default numeric one (`1.2.4-0` becomes `1.2.4-SNAPSHOT`),
or will remove the numeric suffix after provided identifier (`1.2.4-beta.0` becomes `1.2.4-beta`).

```
npm install --save-dev release-it-snapshot-prerelease-version
```

In [release-it](https://github.com/release-it/release-it) config:

```
"plugins": {
  "release-it-snapshot-prerelease-version": {}
}
```
