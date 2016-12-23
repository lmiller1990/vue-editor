const fileStore = {
  state: {
    files: []
  },

  mutations: {
    ADD_FILE (state, payload) {
      state.files.push(payload.file)
    }
  },

  actions: {
    addFile ({commit, state}, payload) {
      console.log("Processing", payload)
    }
  }
}

export { fileStore }
