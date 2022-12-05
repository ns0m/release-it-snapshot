import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const RELEASEIT_PACKAGE_JSON = 'node_modules/release-it/package.json';
const PACKAGE_EXPORTS_START = '"exports": {';
const CUSTOM_EXPORT = '"./customExport_lib-plugin-version-Version.js": "./lib/plugin/version/Version.js"';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootPath = __dirname.split('node_modules')[0];

console.log('◇◇◇ Customizing release-it ◇◇◇');

const manifestPath = path.resolve(rootPath, RELEASEIT_PACKAGE_JSON);
if (!fs.existsSync(manifestPath)) {
  throw new Error(`Unable to customize ${RELEASEIT_PACKAGE_JSON}: not found`);
}
const content = fs.readFileSync(manifestPath, 'utf8');
if (!content.includes(CUSTOM_EXPORT)) {
  const newContent = content.replace(new RegExp(`${PACKAGE_EXPORTS_START}(\r?\n?)([\t ]+)`), `$&${CUSTOM_EXPORT},$1$2`);
  fs.writeFileSync(manifestPath, newContent, 'utf8');
  console.log(' • export added');
} else {
  console.log(' • export already present');
}
