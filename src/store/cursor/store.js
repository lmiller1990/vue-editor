const cursorStore = {
  state: {
    currentLineNumber: 0,
    currentColumnNumber: 0,
    test: 'Hi!'
  },

  mutations: {
    changeColumn (state, direction) {
      if (direction == 'right') {
        if (state.currentColumnNumber < state.currentFile.lines[state.currentLineNumber].content.length - 1)
          state.currentColumnNumber++
      }
      else if (direction == 'left') {
        if (state.currentColumnNumber - 1 >= 0)
          state.currentColumnNumber--
      }
    },
    test (state, payload) {
      console.log(payload.message)
    }
  }
}
export { cursorStore }
