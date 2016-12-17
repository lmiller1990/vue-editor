<template lang="html">
  <div class="line content">
    <div :class="isCursor(index) + ' character'" v-for="(char, index) in charArray">{{ char }}</div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  props: ['line'],
  created () {

  },
  data () {
    return {
      charArray: this.getLineAsCharArray()
    }
  },
  computed: {
    ...mapState([
      'currentColumnNumber',
      'currentLineNumber'
    ])
  },
  methods: {
    getWhitespace () {
      let content = this.line.content
      let firstChar = content.match(/[a-zA-Z0-9$-/:-?{-~!"^_`\[\]]/).pop()
      return content.substring(0, content.indexOf(firstChar))
    },
    getLineAsCharArray () {
      let whitespace = this.getWhitespace()
      return this.line.content.split('')
    },
    isCursor (index) {
      if (index == this.currentColumnNumber && this.currentLineNumber == this.line.id)
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
