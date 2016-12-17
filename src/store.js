import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const state = {
  files: [{
    id: 1, title: 'My new file',
    lines: [
      {
        id: 1,
        content: 'New line'
      },
      {
        id: 2,
        content: 'Another new line'
      }
    ]
  }],
  currentFile: { id: 0, lines: [] },
  currentLine: 1
}

const mutations = {
  addFile (state) { // first arg for mutations is the state
  },
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
