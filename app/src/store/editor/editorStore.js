import { fuzzyMatch } from '../../utils/fileMapper.js'

const editorStore = {
  namespaced: true,

  state: {
    isFuzzySearching: false,
    fuzzySearchString: '',
    fuzzySearchResults: null
  },

  mutations: {
    UPDATE_FUZZY_SEARCH_STRING (state, payload) {
      state.fuzzySearchString += payload.query
    },
    SET_FUZZY_SEARCHING (state, isSearching) {
      state.isFuzzySearching = isSearching
      console.log('setting true')
    },
    SET_FUZZY_SEARCH_RESULTS (state, results) {
      state.fuzzySearchResults = results
      console.log(results)
    }
  },

  actions: {
    fuzzySearch ({commit, state, rootState}, payload) {
      let fuzzySearchResults = (fuzzyMatch (rootState.file.files, state.fuzzySearchString))

      commit('SET_FUZZY_SEARCH_RESULTS', fuzzySearchResults)
    }
  }
}

export { editorStore }
