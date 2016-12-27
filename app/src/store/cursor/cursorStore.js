const cursorStore = {
  state: {
    currentLineNumber: 0,
    currentColumnNumber: 0
  },

  mutations: {
    JUMP_TO_COLUMN (state, payload) {
      state.currentColumnNumber = payload.column
    },
    CHANGE_COLUMN (state, payload) {
      if (payload.direction == 'right') {
          state.currentColumnNumber++
      }
      else if (payload.direction == 'left') {
          state.currentColumnNumber--
      }
    },
    CHANGE_LINE (state, payload) {
      if (payload.direction == 'down') {
        state.currentLineNumber++
      }
      else if (payload.direction == 'up') {
        state.currentLineNumber--
      }
    }
  },

  actions: {
    gotoLastCharacterOfLine ({commit, state, getters}) {
      commit('JUMP_TO_COLUMN', { column: getters.getCurrentLineContent.trimRight().length })
    },
    gotoFirstCharacterOfLine({commit, state, getters}) {
      if (getters.getCurrentLineContent.trim().length > 0)
        commit('JUMP_TO_COLUMN', { column: getters.getCurrentLineContent.search(/\S|$/) }) // first non white space
    },
    moveRight ({commit, state, rootState}, payload) {
      if (state.currentColumnNumber < rootState.file.currentFile.lines[state.currentLineNumber].content.length)
        commit('CHANGE_COLUMN', { direction: 'right'})
    },
    moveLeft ({commit, state}, payload) {
      if (state.currentColumnNumber - 1 >= 0)
        commit('CHANGE_COLUMN', { direction: 'left' })
    },
    moveDown ({commit, state, rootState}) {
      if (state.currentLineNumber < rootState.file.currentFile.lines.length - 1)
        commit('CHANGE_LINE', { direction: 'down' })
    },
    moveUp ({commit, state}) {
      if (state.currentLineNumber > 0)
        commit('CHANGE_LINE', { direction: 'up' })
    },
  }
}
export { cursorStore }
