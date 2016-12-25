import { processFile } from '../../utils/fileMapper'

const fileStore = {
  state: {
    files: [],
    currentFile: null
  },

  mutations: {
    ADD_FILE (state, payload) {
      console.log("Pushing", payload.file)
      state.files.push(payload.file)
    },
    SET_CURRENT_FILE (state, payload) {
      state.currentFile = state.files[0]
    },
    INSERT_LINE (state, payload) {
      let currentLines = state.currentFile.lines
      for (let line in currentLines) {
        if (currentLines[line].id >= payload.lineIndexToInsertAt)
          currentLines[line].id++
      }
      currentLines.splice(payload.lineIndexToInsertAt , 0, {
        id: payload.lineIndexToInsertAt, content: payload.content })
    },
    UPDATE_LINE_CONTENT (state, payload) {
      let whiteSpace = new Array(payload.lineStartIndex).join(' ')
      state.currentFile.lines[payload.lineNumber].content =
        whiteSpace + payload.content
    },
    REMOVE_CURRENT_CHARACTER (state, cursor) {
      let content = state.currentFile.lines[cursor.y].content
      let before = content.slice(0, cursor.x - 1)
      let after = content.slice(cursor.x, content.length)
      state.currentFile.lines[cursor.y].content =
        before + after
    },
    APPEND_CHARACTER (state, payload) {
      state.currentFile.lines[payload.y].content =
      state.currentFile.lines[payload.y].content.slice(0, payload.x) +
      payload.character +
      state.currentFile.lines[payload.y].content.slice(payload.x)
    }
  },

  actions: {
    addFile ({commit, state, dispatch}, payload) {
      let processedFile = processFile({ lines: payload.lines })
      commit('ADD_FILE', { file: processedFile })
      commit('SET_CURRENT_FILE', { id: 0 })
    }
  },
  getters: {
    getCurrentLinesFS (state, getters) {
      if (state.files[0] != null) {
        return state.files[0].lines
      }
    },
    getCurrentFile (state) {
      if (state.currentFile)
        return state.currentFile
    }
  }
}

export { fileStore }
