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
      file.lines.push({id: index, content: value}))

    return file
}

export { processFile }
