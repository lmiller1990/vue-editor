<template lang="html">
  <div class="line content">
    <div :class="isCursor(index) + ' character'" v-for="(char, index) in $store.state.currentFile.lines[line.id].content.split('')">{{ char }}</div>
  </div>
</template>

<script>
import { mapState, mapGetters } from 'vuex'
export default {
  props: ['line'],
  computed: {
    ...mapGetters([
      'getCurrentLineNumber',
      'getCurrentColumnNumber'
    ]),
    ...mapState([
      'currentColumnNumber'
    ])
  },
  methods: {
    isCursor (index) {
      if (index == this.$store.state.cursor.currentColumnNumber && this.$store.state.cursor.currentLineNumber == this.line.id)
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
