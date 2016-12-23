function processFile (payload) {
  return new Promise(function (resolve, reject) {
    // do stuff
    let file = {
      name: payload.name,
      id: 1,
      lines: []
    }
    let lines = payload.lines.split("\n")

    lines.forEach((value, index) =>
      file.lines.push({id: index, content: value}))
    resolve (file)
  })
}

function loadFile (payload) {
  return new Promise(function (resolve, reject) {
    var rawFile = new XMLHttpRequest();
    rawFile.open("GET", payload.file, false);
    rawFile.onreadystatechange = function () {
      if (rawFile.status === 200 || rawFile.status == 0) {
        resolve(rawFile.responseText)
      }
    }
    rawFile.send()
  })
}

export { processFile, loadFile }
