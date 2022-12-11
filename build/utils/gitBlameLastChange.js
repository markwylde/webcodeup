import { execSync } from 'child_process';
import parseBlame from './parseBlame.js';

function getLastBlame (output) {
  const { commitData, lineData } = parseBlame(output);
  return commitData[lineData[1].hash];
}

function gitBlameLastChange (filePath) {
  const output = execSync(`git blame --date=iso -p "${filePath}"`, { encoding: 'utf8' });

  const result = getLastBlame(output);

  result.authorTime = new Date(result.authorTime * 1000);
  result.committerTime = new Date(result.committerTime * 1000);

  return result;
}

export default gitBlameLastChange;
