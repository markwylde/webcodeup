import test from 'basictap';
import clearCommentsFromMarkdown from '../utils/clearCommentsFromMarkdown.js';

test('clearCommentsFromMarkdown removes comment blocks', t => {
  const content = '---\nThis is a comment\n---\nThis is not a comment';
  const clearedContent = clearCommentsFromMarkdown(content);

  t.notEqual(content, clearedContent, 'content should have changed');
  t.doesNotMatch(clearedContent, /^---\n.*\n---\n/s, 'cleared content should not contain comment blocks');
});

test('clearCommentsFromMarkdown does not modify content without comment blocks', t => {
  const content = 'This is not a comment';
  const clearedContent = clearCommentsFromMarkdown(content);

  t.equal(content, clearedContent, 'content should not have changed');
});

test('clearCommentsFromMarkdown works with multiline comments', t => {
  const content = '---\nThis is a comment\nthat spans multiple lines\n---\nThis is not a comment';
  const clearedContent = clearCommentsFromMarkdown(content);

  t.notEqual(content, clearedContent, 'content should have changed'); //
  t.doesNotMatch(clearedContent, /^---\n.*\n---\n/s, 'cleared content should not contain comment blocks');
});

test('clearCommentsFromMarkdown works with empty comments', t => {
  const content = '---\n---\nThis is not a comment';
  const clearedContent = clearCommentsFromMarkdown(content);

  t.notEqual(content, clearedContent, 'content should have changed');
  t.doesNotMatch(clearedContent, /^---\n.*\n---\n/s, 'cleared content should not contain comment blocks');
});

test('clearCommentsFromMarkdown works with comments at the beginning and end of the content', t => {
  const content = '---\nThis is a comment\n---\nThis is not a comment\n---\nThis is another comment\n---';
  const clearedContent = clearCommentsFromMarkdown(content);

  t.notEqual(content, clearedContent, 'content should have changed');
  t.doesNotMatch(clearedContent, /^---\n.*\n---\n/s, 'cleared content should not contain comment blocks');
});
