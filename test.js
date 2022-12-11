import { globby } from 'globby';

const testFiles = await globby('./build/**/tests/*.test.js');

testFiles.forEach(file => import(file));
