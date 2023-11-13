import { execSync } from 'child_process';

function gitLogLastChange(filePath) {
  let output;
  try {
    output = execSync(`git log -1 --format="%an|%cd" -- "${filePath}"`, { encoding: 'utf8' });
  } catch (error) {
    console.error(`Could not retrieve the last commit information for ${filePath}`);
    return null;
  }

  const [author, date] = output.trim().split('|');

  return {
    author,
    authorTime: new Date(date)
  }
}

export default gitLogLastChange;
