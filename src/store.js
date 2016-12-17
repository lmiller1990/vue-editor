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
  setCurrentFile (state, fileId) {
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
    let content = state.currentFile.lines[state.currentLineNumber].content

    state.currentFile.lines[state.currentLineNumber].content =
      content.slice(0, state.currentColumnNumber) +
      content.slice(state.currentColumnNumber + 1, content.length)
  },
  moveCursorBackOneUnit (state) {
    state.currentColumnNumber--;
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
  currentFile: state => {
    return state.currentFile
  },
  currentLines: (state, getters) => {
    return getters.currentFile.lines
  },
  getCurrentLineContent: state => {
    return state.currentLineContent
  },
  getCurrentLineNumber: state => { return state.currentLineNumber } ,
  getCurrentColumnNumber: state => { return state.currentColumnNumber }
}

export default new Vuex.Store({
  state,
  getters,
  actions,
  mutations
})
