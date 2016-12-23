<template lang="html">
  <div class="editor container">
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
  }
}
</script>

<style lang="css" scoped>

</style>
