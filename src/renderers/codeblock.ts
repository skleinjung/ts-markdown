export const codeblockRenderer = (
  entry: CodeBlockEntry,
  options: DataDrivenMarkdownOptions
) => {
  const fencing = options.useCodeblockFencing ?? entry.fenced;
  if ('codeblock' in entry) {
    let linePrefix = fencing ? '' : '    ';
    let blockStart = fencing
      ? getCodeFenceOpen(fencing, entry.language) + '\n'
      : '';
    let blockEnd = fencing ? '\n' + getCodeFenceClose(entry, options) : '';

    let codeBlock =
      typeof entry.codeblock === 'string'
        ? linePrefix + entry.codeblock.split('\n').join('\n' + linePrefix)
        : entry.codeblock.map((line) => linePrefix + line).join('\n');

    return `${blockStart}${codeBlock}${blockEnd}`;
  }

  throw new Error('Entry is not a codeblock entry. Unable to render.');
};

function getCodeFenceOpen(fencing: boolean | '`' | '~', language?: string) {
  let fenceCharacter = getCodeFenceCharacter(fencing);
  let languageCharacter = language ?? '';
  return fenceCharacter + fenceCharacter + fenceCharacter + languageCharacter;
}

function getCodeFenceCharacter(fencing: boolean | '`' | '~') {
  return fencing === '~' ? '~' : '`';
}

function getCodeFenceClose(
  entry: CodeBlockEntry,
  options: DataDrivenMarkdownOptions
) {
  let fenceCharacter = getCodeFenceCharacter(
    entry.fenced ?? options.useCodeblockFencing
  );
  return fenceCharacter + fenceCharacter + fenceCharacter;
}
