function processFile (payload) {
    // do stuff
    let file = {
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
  let lineLength = 80
  while (content.length < lineLength) {
    content += ' '
  }
  return content
}
export { processFile }
