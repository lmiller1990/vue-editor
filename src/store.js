import Vue from 'vue'
import Vuex from 'vuex'
import { text } from './assets/sampletext'

Vue.use(Vuex)

const state = {
  files: [
    text
  ],
  currentFile: { id: 0, lines: [] },
  currentLine: 1,
  currentColumn: 1
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
  changeLine (state, direction) {
    if (direction == 'down') {
      if ((state.currentLine - 1) > 0)
        state.currentLine--
    }
    else if (direction == 'up') {
      if (state.currentLine + 1 <= state.currentFile.lines.length)
          state.currentLine++
    }
  },
  changeColumn (state, direction) {
    if (direction == 'right') {
      state.currentColumn++
    }
    else if (direction == 'left') {
      state.currentColumn--
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
  }
}

export default new Vuex.Store({
  state,
  getters,
  actions,
  mutations
})
