<template lang="html">
<span>
  <div class="tab" v-for="file in getOrdered" @click="setActiveTab(file)">
    {{ file.name }}
  </div>
  <div class="right floated tab">
    {{ query }}
    <div v-for="result in fuzzyResults">
      {{ result.name }}
    </div>
  </div>
</span>
</template>

<script>
import { mapState, mapGetters } from 'vuex'
export default {
  computed: {
    ...mapState({
      getBufferedFiles: state => state.file.files,
      query: state => state.editor.fuzzySearchString,
      fuzzyResults: state => state.editor.fuzzySearchResults
    }),
    ...mapGetters([
      'getOrdered'
    ])
  },
  methods: {
    setActiveTab (file) {
      this.$store.commit('SET_CURRENT_FILE', { id: file.id, order: file.order, name: file.name })
      this.$store.commit('FOCUS_EDITOR')
    }
  }
}
</script>

<style lang="css" scoped>
.tab {
  display: inline-block;
  font-family: "Courier New", monospace;
  font-size: 1em;
  margin-right: 1em;
}

.right.floated {
  float: right;
}

</style>
