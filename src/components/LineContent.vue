<template lang="html">
  <div class="line content">
    <div :class="isCursor(index) + ' character'" v-for="(char, index) in $store.state.currentFile.lines[line.id].content.split('')">{{ char }}</div>
  </div>
</template>

<script>
import { mapState, mapGetters } from 'vuex'
export default {
  props: ['line'],
  created () {
    const c = this.currentContent
  },
  computed: {
    ...mapGetters([
      'getCurrentLineNumber',
      'getCurrentColumnNumber'
    ]),
    currentContent () {
      if (this.currentLineNumber == this.line.id) {
        return this.$store.state.currentFile.lines[this.line.id].content.split('')
      }
    }
  },
  methods: {
    // getWhitespace () {
    //   let content = this.line.content
    //   let firstChar = content.match(/[a-zA-Z0-9$-/:-?{-~!"^_`\[\]]/).pop()
    //   return content.substring(0, content.indexOf(firstChar))
    // },
    isCursor (index) {
      if (index == this.getCurrentColumnNumber && this.getCurrentLineNumber == this.line.id)
        return 'cursor'
    }
  }
}
</script>

<style lang="css">
.line.content {
  flex-grow: 30;
  white-space: pre;
}

.character {
  display: inline-block;
}

.cursor {
  background-color: rgb(153, 204, 255);
}
</style>
