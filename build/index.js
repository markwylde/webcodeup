import path from 'path';
import { promises as fs } from 'fs';
import statictron from 'statictron';
import chokidar from 'chokidar';
import debounce from 'debounce';
import { globby } from 'globby';
import { marked } from 'marked';
import hljs from 'highlight.js';
import gitBlameLastChange from './utils/gitBlameLastChange.js';
import formatDate from './utils/formatDate.js';
import extractMetadataFromMarkdown from './utils/extractMetadataFromMarkdown.js';
import clearCommentsFromMarkdown from './utils/clearCommentsFromMarkdown.js';

marked.setOptions({
  highlight: function (code, lang) {
    return hljs.highlight(code, { language: lang }).value;
  }
});

async function build () {
  const blogFiles = await globby('./content/blog/**/*.md');
  const blogEntries = await Promise.all(
    blogFiles
      .map(async entry => {
        const content = await fs.readFile(entry, 'utf8');

        return {
          id: entry.slice('./content/blog/'.length),
          content: marked.parse(clearCommentsFromMarkdown(content)),
          lastUpdated: gitBlameLastChange(entry),
          ...extractMetadataFromMarkdown(content)
        };
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
