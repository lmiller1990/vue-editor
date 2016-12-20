import Vue from 'vue'
import Vuex from 'vuex'
import { text } from '../assets/sampletext'
import { cursorStore } from './cursor/cursorStore'

Vue.use(Vuex)

const state = {
  files: [
    text
  ],
  currentFile: { id: 0, lines: [] }
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
    let cursor = cursorStore.state
    let content = state.currentFile.lines[cursor.currentLineNumber].content
    state.currentFile.lines[cursor.currentLineNumber].content =
      content.slice(0, cursor.currentColumnNumber) +
      content.slice(cursor.currentColumnNumber + 1, content.length)
  }
}

const actions = {
  moveRight ({commit, state}, payload) {
    let cursorState = cursorStore.state
    if (cursorState.currentColumnNumber < state.currentFile.lines[cursorState.currentLineNumber].content.length - 1)
      commit('CHANGE_COLUMN', { direction: 'right'})
  },
  moveLeft ({commit}, payload) {
    if (cursorStore.state.currentColumnNumber - 1 >= 0)
      commit('CHANGE_COLUMN', { direction: 'left' })
  },
  moveDown ({commit, state}) {
    if (cursorStore.state.currentLineNumber < state.currentFile.lines.length - 1)
      commit('CHANGE_LINE', { direction: 'down' })
  },
  moveUp ({commit, state}) {
    if (cursorStore.state.currentLineNumber > 0)
      commit('CHANGE_LINE', { direction: 'up' })
  }
}

const getters = {
  currentFile: state => { return state.currentFile },
  getCurrentLines: (state, getters) => { return getters.currentFile.lines },
  getWorkingLineContent: (state, getters) => {
    return getters.currentFile.lines[state.cursor.currentLineNumber].content
  }
}

export default new Vuex.Store({
  state,
  getters,
  actions,
  mutations,
  modules: {
    cursor: cursorStore
  }
})
