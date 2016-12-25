import Vue from 'vue'
import Vuex from 'vuex'
import { text } from '../assets/sampletext'
import { cursorStore } from './cursor/cursorStore'
import { fileStore } from './file/fileStore'

Vue.use(Vuex)

const state = {
}

const mutations = {
}

const actions = {
  saveFile (context) {
    var txtFile = "test.txt";
    var file = new File(txtFile);
    var str = "My string of text";

    file.open("w"); // open file with write access
    file.writeln("First line of text");
    file.writeln("Second line of text " + str);
    file.write(str);
    file.close();
  },
  appendCharacter ({commit, state}, payload) {
    commit('APPEND_CHARACTER', {
      character: payload.character,
      x: cursorStore.state.currentColumnNumber,
      y: cursorStore.state.currentLineNumber })
  },
  moveRight ({commit, state}, payload) {
    let cursorState = cursorStore.state
    if (cursorState.currentColumnNumber < fileStore.state.currentFile.lines[cursorState.currentLineNumber].content.length)
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
      commit('REMOVE_CURRENT_CHARACTER', { x: cursorStore.state.currentColumnNumber, y: cursorStore.state.currentLineNumber })
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
  getCurrentLines: (state, getters) => { return getters.currentFile.lines },
  getWorkingLineContent: (state, getters) => {
    if (state.file.currentFile)
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
