const commentRegex = /^---([\S\s]*?)---\n/s;

function clearCommentsFromMarkdown (content) {
  const commentMatch = commentRegex.exec(content);

  if (commentMatch) {
    const clearedContent = content.replace(commentRegex, '');
    return clearedContent;
  } else {
    return content;
  }
}

export default clearCommentsFromMarkdown;
