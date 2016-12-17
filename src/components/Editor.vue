<template lang="html">
  <div>
    Editor
    <editor-input></editor-input>
    <container></container>
    <div class="debug">
      Debug:
      <p>Line: {{ $store.state.currentLineNumber }}
        Length: {{ $store.state.currentFile.lines[$store.state.currentLineNumber].content.length }}</p>
      <p>Column: {{ $store.state.currentColumnNumber }}</p>
      <p>Current Line {{ getCurrentLineContent }}</p>
    </div>
  </div>
</template>

<script>
import container    from './EditorMainContainer.vue'
import editorinput  from './EditorInput.vue'

import { mapGetters, mapState, mapMutations } from 'vuex'

export default {
  components: {
    container,
    'editor-input': editorinput
  },
  created () {
    this.setCurrentFile(1)
  },

  computed: {
    ...mapState([
      'currentFile'
    ]),
    ...mapGetters([
      'getCurrentLineContent'
    ])
  },
  methods: {
    ...mapMutations([
      'setCurrentFile'
    ]),
  }
}
</script>

<style lang="css" scoped>
.debug {
  font-size: 1rem;
  border: solid 1px grey;
  margin-top: 5em;
}
</style>
