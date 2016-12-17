<template lang="html">
  <div>
    Editor
    <editor-input></editor-input>
    <sidebar :lines="currentFile.lines"></sidebar>
  </div>
</template>

<script>
import editorline   from './EditorLine.vue'
import sidebar      from './Sidebar.vue'
import editorinput  from './EditorInput.vue'
import { mapGetters, mapState, mapMutations } from 'vuex'

export default {
  components: {
    editorline,
    sidebar,
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
