import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const state = {
  files: [
    { id: 1, title: 'My new file',  lines: [ { id: 1, content: 'New line' } ] }
  ],
  currentFile: { id: 0, lines: [] }
}

const mutations = {
  addFile (state) { // first arg for mutations is the state
  },
  setCurrentFile (state, fileId) {
    state.currentFile = state.files.filter(
      file => file.id == fileId
    )[0]
  },
  addLine (state, line) {
    state.currentFile.lines.push({
      id: state.currentFile.lines.length + 1,
      content: line.content
    })
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
