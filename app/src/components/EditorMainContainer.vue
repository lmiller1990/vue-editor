<template lang="html">
  <div class="editor container">
    <editor-line v-for="line in getCurrentLines" :line="line"></editor-line>
  </div>
</template>

<script>
import editorline   from './EditorLine.vue'
import { mapGetters } from 'vuex'

export default {
  created () {
    console.log(this.getCurrentLines)
  },
  components: {
    'editor-line': editorline
  },
  computed: {
    ...mapGetters([
      'getCurrentLines'
    ])
  }
}
</script>

<style lang="css" scoped>
.editor.container {
  font-family: "Courier New", monospace;
  font-size: 1em;
}
</style>
