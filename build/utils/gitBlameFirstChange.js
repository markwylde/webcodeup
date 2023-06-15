import { execSync } from 'child_process';
import parseBlame from './parseBlame.js';

function getFirstBlame (output) {
  const { commitData, lineData } = parseBlame(output);
  return commitData[lineData[1].hash];
}

function gitBlameFirstChange (filePath) {
  let output;
  try {
    output = execSync(`git blame --date=iso -p "${filePath}"`, { encoding: 'utf8' });
  } catch (error) {
    console.log(`Could not git blame ${filePath}`);
    return null;
  }

  const result = getFirstBlame(output);

  if (!result) {
    return null;
  }

  result.authorTime = new Date(result.authorTime * 1000);
  result.committerTime = new Date(result.committerTime * 1000);

  return result;
}

export default gitBlameFirstChange;
