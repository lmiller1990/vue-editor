'use strict'

const electron = require('electron')
const path = require('path')
const app = electron.app
const BrowserWindow = electron.BrowserWindow

let mainWindow
let config = {}

if (process.env.NODE_ENV === 'development') {
  config = require('../config')
  config.url = `http://localhost:${config.port}`
} else {
  config.devtron = false
  config.url = `file://${__dirname}/dist/index.html`
}

function createWindow () {
  /**
   * Initial window options
   */
  mainWindow = new BrowserWindow({
    height: 600,
    width: 800
  })

  mainWindow.loadURL(config.url)

  if (process.env.NODE_ENV === 'development') {
    BrowserWindow.addDevToolsExtension(path.join(__dirname, '../node_modules/devtron'))

    let installExtension = require('electron-devtools-installer')

    installExtension.default(installExtension.VUEJS_DEVTOOLS)
      .then((name) => mainWindow.webContents.openDevTools())
      .catch((err) => console.log('An error occurred: ', err))
  }

  mainWindow.on('closed', () => {
    mainWindow = null
  })

  console.log('mainWindow opened')
}

app.on('ready', createWindow)

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  if (mainWindow === null) {
    createWindow()
  }
})

/* TODO: loading files - eventually refactor somewhere else? */

const ipc = require('electron').ipcMain
const fs = require('fs')

ipc.on('loadFile', function (event, arg) {
  fs.readFile(arg, 'utf-8', function (err, data) {
    if (err) throw err
    event.sender.send('fileLoaded', data)
  })
})

ipc.on('loadFiles', function (event, files) {
  for (let file in files) {
    console.log(`Reading: ${files[file]}`)
    fs.readFile(files[file], 'utf-8', function (err, data) {
      if (err) throw err
      event.sender.send('fileLoaded', { path: files[file], lines: data })
    })
  }
})

ipc.on('saveFile', function (event, arg) {
  let content = arg.lines.map(function (elem) {
    return elem.content
  }).join("\n")

  fs.writeFile(arg.path, content, function (err) {
    if (err) throw err
    console.log("Saved file")
  })
})
