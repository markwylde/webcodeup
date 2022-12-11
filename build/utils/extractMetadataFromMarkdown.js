import YAML from 'yaml';

const metadataRegex = /---([\S\s]*?)---/s;

function extractMetadataFromMarkdown (content) {
  const metadataMatch = content.match(metadataRegex);

  if (metadataMatch) {
    const metadataString = metadataMatch[1];
    return YAML.parse(metadataString);
  } else {
    return {};
  }
}

export default extractMetadataFromMarkdown;
