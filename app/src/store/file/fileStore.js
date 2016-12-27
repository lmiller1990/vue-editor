import { processFile } from '../../utils/fileMapper'

const fileStore = {
  state: {
    files: [],
    fileCount: 0,
    currentFile: null
  },

  mutations: {
    ADD_FILE (state, payload) {
      state.fileCount++
      state.files.push(payload.file)
    },
    SET_CURRENT_FILE (state, payload) {
      for (let f in state.files) {
        if (payload.id != state.files[f].id) {
          if (state.files[f].order < payload.order){
            state.files[f].order++
          }
        } else {
          state.files[f].order = 0
        }
      }
      state.currentFile = state.files[payload.id]
      // state.currentFile.order = 0
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
      let processedFile = processFile({
        id: state.file.fileCount,
        path: payload.path,
        lines: payload.lines
      })
      commit('ADD_FILE', { file: processedFile })
      // commit('SET_CURRENT_FILE', { id: 0 })
    },
    addFileToBuffer ({commit, state}, payload) {
      let processedFile = processFile({
        id: state.fileCount,
        path: payload.path,
        lines: payload.lines
      })
      commit('ADD_FILE', { file: processedFile })
    }
  },
  getters: {

    getCurrentLines (state, getters) {
      if (state.currentFile) {
        return state.currentFile.lines
      }
    },
    getOrdered (state) {
      console.log('getting')
      return state.files.sort(function (a,b) { return a.order - b.order} )
    }
  }
}

export { fileStore }
