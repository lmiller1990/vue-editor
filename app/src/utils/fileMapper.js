import prefs from '../prefs.js'

function processFile (payload) {
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
    file.lines.push({id: index, content: addWhitespaceTilEndOfLine(value)  }))

  return file
}

function addWhitespaceTilEndOfLine (content) {
  let lineLength = prefs.lineLength
  while (content.length < lineLength) {
    content += ' '
  }
  return content
}
export { processFile, addWhitespaceTilEndOfLine }
