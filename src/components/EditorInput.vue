<template lang="html">
  <input type="text" v-model="userInput" v-on:keydown.prevent="update">
</template>

<script>
import { isModifier } from '../utils/keyManager'

export default {
  data () {
    return {
      userInput: '',
      lineCount: 0,
      lines: [ { id: 1, content: 'function () {' }, { id: 2, content: '----}' } ]
    }
  },
  methods: {
    update (event) {
      console.log(event)
      if (event.keyCode == 13) {
        // return key
        this.lineCount++
        this.lines.push({ id: this.lineCount, content: '' })
      }
    }
  }
}
</script>

<style lang="css">
</style>
