<template lang="html">
  <div class="line content">
    <div
      v-for="(char, index) in getCurrentLines[line.id].content.split('')"
      :class="isCursor(index) + ' character'">{{char}}</div>
    </div>
</template>

<script>
import { mapState, mapGetters } from 'vuex'
export default {
  props: ['line'],
  computed: {
    ...mapGetters([
      'getCurrentLines'
    ]),
    ...mapState({
      cursorX: state => state.cursor.currentColumnNumber,
    })
  },
  methods: {
    isCursor (index) {
      if (index == this.cursorX && this.$store.state.cursor.currentLineNumber == this.line.id)
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
  box-shadow: -2px 0px rgb(153, 204, 255);
}
</style>
