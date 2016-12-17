<template lang="html">
  <div class="editor line container" :style="isCurrentLine">
    <linenumber  :lineNumber="line.id"></linenumber>
    <linecontent :line="line"></linecontent>
  </div>
</template>

<script>
import linenumber   from './LineNumber.vue'
import linecontent  from './LineContent.vue'
import { mapState, mapMutations } from 'vuex'

export default {
  props: ['line'],
  components: {
    linenumber,
    linecontent
  },
  computed: {
    ...mapState([
      'currentLineNumber'
    ]),
    isCurrentLine () {
      if (this.currentLineNumber == this.line.id)
        return { 'background-color': 'rgb(100, 100, 155)' }
    }
  },
  methods: {
    breakBySpace () {
      return this.line.content.split(" ")
    }
  }
}
</script>

<style lang="css" scoped>
.editor.line.container {
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  align-items: stretch;
}
</style>
