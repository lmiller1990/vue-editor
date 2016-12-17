import Vue from 'vue'
import Vuex from 'vuex'
import { text } from './assets/sampletext'

Vue.use(Vuex)

const state = {
  files: [
    text
  ],
  currentFile: { id: 0, lines: [] },
  currentLineNumber: 0,
  currentColumnNumber: 1,
  currentLineContent: ''
}

const mutations = {
  addFile (state) { // first arg for mutations is the state
  },
  setCurrentFile (state, fileId) {
    console.log("filtering", text)
    state.currentFile = state.files.filter(
      file => file.id == fileId
    )[0]
  },
  addLine (state, content) {
    state.currentFile.lines.push({
      id: state.currentFile.lines.length + 1,
      content: content
    })
  },
  removeCurrentCharacter (state) {
    let content = state.currentLineContent
    console.log(content)

    state.currentLineContent =
      content.slice(0, state.currentColumnNumber) +
      content.slice(state.currentColumnNumber + 1, content.length)
  },
  setCurrentLine (state, lineNumber) {
    state.currentLineContent = state.currentFile.lines[lineNumber].content
  },
  changeLine (state, direction) {
    if (direction == 'up') {
      if (state.currentLineNumber > 0)
        state.currentLineNumber--
    }
    else if (direction == 'down') {
      if (state.currentLineNumber < state.currentFile.lines.length - 1)
          state.currentLineNumber++
    }
  },
  changeColumn (state, direction) {
    if (direction == 'right') {
      state.currentColumnNumber++
    }
    else if (direction == 'left') {
      state.currentColumnNumber--
    }
  },
  updateCurrentFile (state, file) {
    state.currentFile = file
  }
}

const actions = {
  // for async
}

const getters = {
  files: state => {
    return state.files
  },
  currentFile: state => {
    return state.currentFile
  },
  currentLines: (state, getters) => {
    return getters.currentFile.lines
  },
  getCurrentLineContent: state => {
    return state.currentLineContent
  }
}

export default new Vuex.Store({
  state,
  getters,
  actions,
  mutations
})
