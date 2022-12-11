import path from 'path';
import { promises as fs } from 'fs';
import statictron from 'statictron';
import chokidar from 'chokidar';
import debounce from 'debounce';
import { globby } from 'globby';
import { marked } from 'marked';
import gitBlameLastChange from './utils/gitBlameLastChange.js';
import hljs from 'highlight.js';

marked.setOptions({
  highlight: function(code, lang) {
    return hljs.highlight(lang, code).value;
  }
});

function formatDate(date) {
  const isoString = date.toISOString();

  const year = isoString.split('-')[0];
  const month = isoString.split('-')[1];
  const day = isoString.split('-')[2].slice(0, 2);

  const hour = isoString.split('T')[1].split(':')[0];
  const minute = isoString.split('T')[1].split(':')[1];

  const formattedDate = [year, month, day].join('/') + ' ' + [hour, minute].join(':');

  return formattedDate;
}

async function getDateLastModified(filePath) {
  const stats = await fs.stat(filePath);
  const lastModified = new Date(stats.mtime);
  return lastModified;
}

function extractMetadata(content) {
  const metadataRegex = /^---\n(.*)\n---\n/s;
  const metadataMatch = metadataRegex.exec(content);

  if (metadataMatch) {
    const metadataString = metadataMatch[1];
    const metadataLines = metadataString.split('\n');

    const metadata = metadataLines.reduce((metadata, line) => {
      const [key, value] = line.split(':');
      const keyTrimmed = key.trim();
      const valueTrimmed = value.trim();
      metadata[keyTrimmed] = valueTrimmed;

      return metadata;
    }, {});

    return metadata;
  } else {
    return {};
  }
}


function clearComments(content) {
  const commentRegex = /^---\n(.*)\n---\n/s;
  const commentMatch = commentRegex.exec(content);

  if (commentMatch) {
    const clearedContent = content.replace(commentRegex, '');
    return clearedContent;
  } else {
    return content;
  }
}

async function build () {
  const blogFiles = await globby('./content/blog/**/*.md');
  const blogEntries = await Promise.all(
    blogFiles
      .map(async entry => {
        const content = await fs.readFile(entry, 'utf8');

        return {
          id: entry.slice('./content/blog/'.length),
          content: marked.parse(clearComments(content)),
          lastUpdated: await getDateLastModified(entry),
          lastUpdatedBy: gitBlameLastChange(entry),
          ...extractMetadata(content)
        }
      })
  );

  return statictron({
    source: './src',
    output: './dist',
    loaders: [
      statictron.loaders.ejs,
      statictron.loaders.css
    ],
    scope: {
      formatDate,
      blogEntries,
      fromMarkdown: marked.parse
    },
    logger: console.log
  });
}

if (['-w', '--watch'].includes(process.argv[2]?.trim())) {
  const debouncedBuild = debounce(build, 300);
  async function watch () {
    chokidar.watch([
      path.resolve('./src')
    ]).on('all', debouncedBuild);
  }
  watch();
} else {
  build();
}
