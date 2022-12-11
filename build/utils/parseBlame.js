const parseBlame = (blame) => {
  const lines = blame.split('\n');
  if (!lines.length) {
    return false;
  }

  let settingCommitData = false;
  let currentCommitHash = '';
  let currentLineNumber = 1;
  const commitData = {};
  const lineData = {};

  lines.forEach(line => {
    if (line[0] === '\t') {
      lineData[currentLineNumber].code = line.substr(1);
      settingCommitData = false;
      currentCommitHash = '';
    } else {
      const arrLine = line.split(' ');
      if (settingCommitData) {
        const parsedCommitLine = parseCommitLine(arrLine, commitData[currentCommitHash]);
        commitData[currentCommitHash] = {
          ...commitData[currentCommitHash],
          ...parsedCommitLine
        };
      } else {
        if (arrLine[0].length === 40) {
          currentCommitHash = arrLine[0];
          currentLineNumber = arrLine[2];

          lineData[arrLine[2]] = {
            code: '',
            hash: currentCommitHash,
            originalLine: arrLine[1],
            finalLine: arrLine[2],
            numLines: arrLine[3] || -1
          };

          if (!commitData[arrLine[0]]) {
            settingCommitData = true;
            commitData[arrLine[0]] = {
              author: '',
              authorMail: '',
              authorTime: '',
              authorTz: '',
              committer: '',
              committerMail: '',
              committerTime: '',
              committerTz: '',
              summary: '',
              previousHash: '',
              filename: ''
            };
          }
        }
      }
    }
  });

  return {
    commitData,
    lineData
  };
};

const parseCommitLine = (lineArr, currentCommitData) => {
  const parsedCommitData = {};
  switch (lineArr[0]) {
    case 'author':
      parsedCommitData.author = lineArr.slice(1).join(' ');
      break;

    case 'author-mail':
      parsedCommitData.authorMail = lineArr[1];
      break;

    case 'author-time':
      parsedCommitData.authorTime = lineArr[1];
      break;

    case 'author-tz':
      parsedCommitData.authorTz = lineArr[1];
      break;

    case 'committer':
      parsedCommitData.committer = lineArr.slice(1).join(' ');
      break;

    case 'committer-mail':
      parsedCommitData.committerMail = lineArr[1];
      break;

    case 'committer-time':
      parsedCommitData.committerTime = lineArr[1];
      break;

    case 'committer-tz':
      parsedCommitData.committerTz = lineArr[1];
      break;

    case 'summary':
      parsedCommitData.summary = lineArr.slice(1).join(' ');
      break;

    case 'filename':
      parsedCommitData.filename = lineArr[1];
      break;

    case 'previous':
      parsedCommitData.previous = lineArr.slice(1).join(' ');
      break;

    default:
      break;
  }
  return {
    ...currentCommitData,
    ...parsedCommitData
  };
};

export default parseBlame;
