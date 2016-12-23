<template lang="html">
  <div class="editor container">
    <editor-line v-for="line in getCurrentLinesFS" :line="line"></editor-line>
  </div>
</template>

<script>
import editorline   from './EditorLine.vue'
import { mapGetters } from 'vuex'

export default {
  created () {
    console.log(this.getCurrentLinesFS)
  },
  components: {
    'editor-line': editorline
  },
  computed: {
    ...mapGetters([
      'getCurrentLinesFS'
    ])
  }
}
</script>

<style lang="css" scoped>

</style>
