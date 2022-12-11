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
  const output = execSync(`git blame -p "${filePath}"`, { encoding: 'utf8' });

  return getLastBlame(output);
}

export default gitBlameLastChange;
