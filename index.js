import VersionPlugin from 'release-it/lib/plugin/version/Version.js';
import semver from 'semver';

class SnapshotPreReleaseVersionPlugin extends VersionPlugin {
  static isEnabled(options) {
    return options !== false;
  }

  incrementVersion(...args) {
    const nextVersion = super.incrementVersion(...args);
    const parsedVersion = semver.parse(nextVersion);
    if (parsedVersion && parsedVersion.prerelease.length) {
      if (parsedVersion.prerelease.length === 1 && typeof parsedVersion.prerelease[0] === 'number') {
        parsedVersion.prerelease = ['SNAPSHOT'];
        return parsedVersion.format();
      } else if (typeof parsedVersion.prerelease[parsedVersion.prerelease.length - 1] === 'number') {
        parsedVersion.prerelease.pop();
        return parsedVersion.format();
      }
    }
    return null;
  }
}

export default SnapshotPreReleaseVersionPlugin;
