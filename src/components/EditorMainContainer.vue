<template lang="html">
  <div class="editor container">
    <editor-line v-for="line in currentFileLines" :line="line"></editor-line>

  </div>
</template>

<script>
import editorline   from './EditorLine.vue'
import { mapState } from 'vuex'

export default {
  components: {
    'editor-line': editorline
  },
  computed: {
    currentFileLines () {
      return this.$store.state.currentFile.lines
    }
  }
}
</script>

<style lang="css" scoped>
.editor.container {
  /*display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  align-items: stretch;*/
}

.flex1 {
  flex-grow: 1
}

.flex2 {
  flex-grow: 40
}
</style>
