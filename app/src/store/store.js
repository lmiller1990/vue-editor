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
  addLineBreak(context) {
    let workingLine = context.getters.getCurrentLineContent
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

export default new Vuex.Store({
  state,
  actions,
  mutations,
  modules: {
    cursor: cursorStore,
    file: fileStore
  }
})
