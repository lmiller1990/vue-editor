import prefs from '../prefs.js'

function processFile(payload) {
  console.log(prefs)
  let file = {
    order: payload.id,
    name: payload.path.split('/').pop(),
    path: payload.path,
    id: payload.id,
    lines: []
  }
  let lines = payload.lines.split("\n")

  lines.forEach((value, index) =>
    file.lines.push({
      id: index,
      content: addWhitespaceTilEndOfLine(value)
    }))

  return file
}

function addWhitespaceTilEndOfLine(content) {
  let lineLength = prefs.lineLength
  while (content.length < lineLength) {
    content += ' '
  }
  return content
}

function fuzzyMatch(searchSet, query) {
  var tokens = query.toLowerCase().split(''),
    matches = [];

  searchSet.forEach(function(string) {
    var tokenIndex = 0,
      stringIndex = 0,
      matchWithHighlights = '',
      matchedPositions = [];

    string = string.toLowerCase();

    while (stringIndex < string.length) {
      if (string[stringIndex] === tokens[tokenIndex]) {
        matchWithHighlights += highlight(string[stringIndex]);
        matchedPositions.push(stringIndex);
        tokenIndex++;

        if (tokenIndex >= tokens.length) {
          matches.push({
            match: string,
            highlighted: matchWithHighlights + string.slice(stringIndex + 1),
            positions: matchedPositions
          });

          break;
        }
      } else {
        matchWithHighlights += string[stringIndex];
      }

      stringIndex++;
    }
  });
  return matches;
}

export {
  processFile,
  addWhitespaceTilEndOfLine,
  fuzzyMatch
}
