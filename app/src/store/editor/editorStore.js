const editorStore = {
  namespaced: true,

  state: {
    isFuzzySearching: false,
    fuzzySearchString: ''
  },

  mutations: {
    UPDATE_FUZZY_SEARCH_STRING (state, payload) {
      state.fuzzySearchString += payload.query
    },
    SET_FUZZY_SEARCHING (state, isSearching) {
      state.isFuzzySearching = isSearching
      console.log('setting true')
    }
  }
}

export { editorStore }
