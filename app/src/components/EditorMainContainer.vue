<template lang="html">
  <div class="editor container" @click="focusEditor">
    <editor-line v-for="line in getCurrentLines" :line="line"></editor-line>
  </div>
</template>

<script>
import editorline   from './EditorLine.vue'
import { mapGetters } from 'vuex'

export default {
  components: {
    'editor-line': editorline
  },
  computed: {
    ...mapGetters([
      'getCurrentLines'
    ])
  },
  methods: {
    focusEditor () {
    }
  }
}
</script>

<style lang="css" scoped>
.editor.container {
  font-family: "Courier New", monospace;
  font-size: 1em;
}
</style>
