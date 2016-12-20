const cursorStore = {
  state: {
    currentLineNumber: 0,
    currentColumnNumber: 0,
    test: 'Hi!'
  },

  mutations: {
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
  }
}
export { cursorStore }
