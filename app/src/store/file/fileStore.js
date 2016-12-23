import { processFile, loadFile } from '../../utils/fileMapper'

const fileStore = {
  state: {
    files: [],
    currentFile: null
  },

  mutations: {
    ADD_FILE (state, payload) {
      return new Promise(function (resolve, reject) {
        console.log("Pushing", payload.file)
        state.files.push(payload.file)
        resolve()
      })

    },
    SET_CURRENT_FILE (state, payload) {
      state.currentFile = state.files[0]
    }
  },

  actions: {
    addFile ({commit, state, dispatch}, payload) {
      loadFile({ file: payload.file }).then((res) =>
      processFile({ lines: res })).then ((res) =>
      commit('ADD_FILE', { file: res })).then ((res) =>
      commit('SET_CURRENT_FILE', { id: 0 }))
    }
  },
  getters: {
    getCurrentLinesFS (state, getters) {
      if (state.files[0] != null) {
        return state.files[0].lines
      }
    }
  }
}

export { fileStore }
