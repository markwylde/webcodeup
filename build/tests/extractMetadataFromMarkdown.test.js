import test from 'basictap';
import extractMetadataFromMarkdown from '../utils/extractMetadataFromMarkdown.js';

test('extractMetadataFromMarkdown returns an empty object when no metadata is present', t => {
  const content = `
This is some markdown content without metadata.

It can have multiple paragraphs and other elements.
  `;

  const expected = {};
  const actual = extractMetadataFromMarkdown(content);

  t.deepEqual(actual, expected);
});

test('extractMetadataFromMarkdown extracts metadata when present', t => {
  const content = `
---
title: My Post
date: 2022-12-11
tags:
  - markdown
  - metadata
---

This is some markdown content with metadata.

It can have multiple paragraphs and other elements.
  `;

  const expected = {
    title: 'My Post',
    date: '2022-12-11',
    tags: [
      'markdown',
      'metadata'
    ]
  };
  const actual = extractMetadataFromMarkdown(content);

  t.deepEqual(actual, expected);
});

test('extractMetadataFromMarkdown correctly parses metadata values', t => {
  const content = `
---
title: My Post
date: 2022-12-11
tags:
  - markdown
  - metadata
isPublished: true
---

This is some markdown content with metadata.

It can have multiple paragraphs and other elements.
  `;

  const expected = {
    title: 'My Post',
    date: '2022-12-11',
    tags: [
      'markdown',
      'metadata'
    ],
    isPublished: true
  };
  const actual = extractMetadataFromMarkdown(content);

  t.deepEqual(actual, expected);
});
