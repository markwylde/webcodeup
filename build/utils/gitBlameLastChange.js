import { execSync } from 'child_process';
import BlameJS from 'blamejs';

function getLastBlame (output) {
  const blamejs = new BlameJS();
  blamejs.parseBlame(output);
  const commitData = blamejs.getCommitData();
  const lineData = blamejs.getLineData();
  return commitData[lineData[1].hash];
}

function gitBlameLastChange(filePath) {
  const output = execSync(`git blame --date=iso -p "${filePath}"`, { encoding: 'utf8' });

  const result = getLastBlame(output);
  result.authorTime = new Date(result.authorTime * 1000);
  result.committerTime = new Date(result.committerTime * 1000);

  return result;
}

export default gitBlameLastChange;
