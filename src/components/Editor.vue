<template lang="html">
  <div>
    Editor
    <editor-input></editor-input>
    <container></container>
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
    ])
  },
  methods: {
    ...mapMutations([
      'setCurrentFile'
    ]),
  }
}
</script>

<style lang="css">
</style>
