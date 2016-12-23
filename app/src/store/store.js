import Vue from 'vue'
import Vuex from 'vuex'
import { text } from '../assets/sampletext'
import { cursorStore } from './cursor/cursorStore'
import { fileStore } from './file/fileStore'

Vue.use(Vuex)

const state = {
}

const mutations = {
  INSERT_LINE (state, payload) {
    let currentLines = state.currentFile.lines
    for (let line in currentLines) {
      if (currentLines[line].id >= payload.lineIndexToInsertAt)
        currentLines[line].id++
    }
    currentLines.splice(payload.lineIndexToInsertAt , 0, {
      id: payload.lineIndexToInsertAt, content: payload.content })
  },
  appendCharacter (state, character) {
    state.currentFile.lines[cursorStore.state.currentLineNumber]
      .content =
    state.currentFile.lines[cursorStore.state.currentLineNumber]
      .content.slice(0, cursorStore.state.currentColumnNumber)
      + character +
      state.currentFile.lines[cursorStore.state.currentLineNumber]
        .content.slice(cursorStore.state.currentColumnNumber)
  },
  REMOVE_CURRENT_CHARACTER (state) {
    let cursor = cursorStore.state
    let content = state.file.currentFile.lines[cursor.currentLineNumber].content
    let before = content.slice(0, cursor.currentColumnNumber - 1)
    let after = content.slice(cursor.currentColumnNumber, content.length)
    state.file.currentFile.lines[cursor.currentLineNumber].content =
      before + after
  },
  UPDATE_LINE_CONTENT (state, payload) {
    let whiteSpace = new Array(payload.lineStartIndex).join(' ')
    state.file.currentFile.lines[payload.lineNumber].content =
      whiteSpace + payload.content
  }
}

const actions = {
  moveRight ({commit, state}, payload) {
    let cursorState = cursorStore.state
    if (cursorState.currentColumnNumber < fileStore.state.currentFile.lines[cursorState.currentLineNumber].content.length - 1)
      commit('CHANGE_COLUMN', { direction: 'right'})
  },
  moveLeft ({commit}, payload) {
    if (cursorStore.state.currentColumnNumber - 1 >= 0)
      commit('CHANGE_COLUMN', { direction: 'left' })
  },
  moveDown ({commit, state}) {
    if (cursorStore.state.currentLineNumber < fileStore.state.currentFile.lines.length - 1)
      commit('CHANGE_LINE', { direction: 'down' })
  },
  moveUp ({commit, state}) {
    if (cursorStore.state.currentLineNumber > 0)
      commit('CHANGE_LINE', { direction: 'up' })
  },
  removeCurrentCharacter ({commit, state}) {
    if (cursorStore.state.currentColumnNumber > 0)
      commit('REMOVE_CURRENT_CHARACTER')
  },
  addLineBreak(context) {
    let workingLine = context.getters.getWorkingLineContent
    let beforeCursor = workingLine.slice(0, cursorStore.state.currentColumnNumber)
    let afterCursor = workingLine.slice(cursorStore.state.currentColumnNumber)
    context.commit('INSERT_LINE', { lineIndexToInsertAt: cursorStore.state.currentLineNumber, content: beforeCursor })
    context.commit('CHANGE_LINE', { direction: 'down' })
    context.commit('UPDATE_LINE_CONTENT', {
      lineNumber: cursorStore.state.currentLineNumber,
      content: afterCursor,
      lineStartIndex: cursorStore.state.currentColumnNumber + 1
    })
  }
}

const getters = {
  getCurrentFile: state => { return state.file.currentFile },
  getCurrentLines: (state, getters) => { return getters.currentFile.lines },
  getWorkingLineContent: (state, getters) => {
    return state.file.currentFile.lines[state.cursor.currentLineNumber].content
  }
}

export default new Vuex.Store({
  state,
  getters,
  actions,
  mutations,
  modules: {
    cursor: cursorStore,
    file: fileStore
  }
})
