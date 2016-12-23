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
    addFile ({commit, state, dispatch}, payload) {
      console.log(payload)
      dispatch('loadFile', { file: payload.file } ).then((res) => {
        console.log("Loaded!",res)
      })
    },
    loadFile (context, payload) {
      console.log(`Loading ${payload.file}`)
      return new Promise(function (resolve, reject) {
        var rawFile = new XMLHttpRequest();
        rawFile.open("GET", payload.file, false);
        rawFile.onreadystatechange = function () {
          if (rawFile.status === 200 || rawFile.status == 0) {
            resolve(rawFile.responseText)
          }
        }
        rawFile.send()
      })
    }
  }
}

export { fileStore }
