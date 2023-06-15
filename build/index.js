import path from 'path';
import { promises as fs } from 'fs';
import statictron from 'statictron';
import { format } from 'date-fns';
import chokidar from 'chokidar';
import debounce from 'debounce';
import { globby } from 'globby';
import { marked } from 'marked';
import hljs from 'highlight.js';
import gitBlameLastChange from './utils/gitBlameLastChange.js';
import gitBlameFirstChange from './utils/gitBlameFirstChange.js';
import formatDate from './utils/formatDate.js';
import extractMetadataFromMarkdown from './utils/extractMetadataFromMarkdown.js';
import clearCommentsFromMarkdown from './utils/clearCommentsFromMarkdown.js';

marked.setOptions({
  highlight: function (code, lang) {
    return hljs.highlight(code, { language: lang }).value.replace(/\n/g, '<br />');
  }
});

const renderer = {
  heading(text, level) {
    const escapedText = text.toLowerCase().replace(/[^\w]+/g, '-');

    return `
      <h${level}>
        <a name="${escapedText}" class="anchor" href="#${escapedText}">#</a>
        ${text}
      </h${level}>`;
  }
};

marked.use({ renderer });

async function build () {
  const blogFiles = await globby('./content/blog/**/*.md');
  const blogEntries = await Promise.all(
    blogFiles
      .map(async entry => {
        const content = await fs.readFile(entry, 'utf8');

        const id = entry.slice('./content/blog/'.length);

        return {
          id: id.slice(0, -3),
          content: marked.parse(clearCommentsFromMarkdown(content)),
          lastUpdated: gitBlameLastChange(entry),
          created: gitBlameFirstChange(entry),
          ...extractMetadataFromMarkdown(content)
        };
      })
  );

  blogEntries.sort((a, b) => b.created.authorTime - a.created.authorTime);

  return statictron({
    source: './src',
    output: './dist',
    loaders: [
      statictron.loaders.ejs,
      statictron.loaders.css
    ],
    scope: {
      format,
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
      path.resolve('./src'),
      path.resolve('./content')
    ]).on('all', debouncedBuild);
  }
  watch();
} else {
  build();
}
