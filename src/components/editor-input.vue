<template lang="html">
  <div>
    <input type="text" v-model="userInput" v-on:keydown.prevent="update">

    <sidebar :lines="lines"></sidebar>
    <editor-line v-for="line in lines" :line="line"></editor-line>

    <pre>
      {{ $data
      }}
    </pre>
  </div>
</template>

<script>
import line from './editor-line.vue'
import sidebar from './editor-line-count.vue'
import { isModifier } from '../utils/keyManager'

export default {
  components: {
    'editor-line': line,
    'sidebar': sidebar
  },
  data () {
    return {
      userInput: '',
      lineCount: 0,
      lines: []
    }
  },
  methods: {
    update (event) {
      console.log(event)
      if (isModifier(event.keyCode)) {
        this.lineCount++
        this.lines.push({ id: this.lineCount, content: '' })
      }
      // if (this.isPrintableKey (event.keyCode)) {
      //   this.userInput += event.key
      // }
      //
      // if (event.keyCode == 13) {
      //   this.lineCount++
      //   this.lines.push({ id: this.lineCount, content: this.userInput })
      //   this.userInput = ''
      // }
      // if (event.keyCode == 8) {
      //   this.userInput = this.userInput.slice(0,-1)
      // }
      // if (event.keyCode == 9) {
      //   this.userInput += '----'
      // }
    },
    isPrintableKey (keyCode) {
      var valid =
        (keyCode > 47 && keyCode < 58)   || // number keys
        keyCode == 32                    || // spacebar & return key(s)
        (keyCode > 64 && keyCode < 91)   || // letter keys
        (keyCode > 95 && keyCode < 112)  || // numpad keys
        (keyCode > 185 && keyCode < 193) || // ;=,-./` (in order)
        (keyCode > 218 && keyCode < 223);   // [\]' (in order)

        return valid;
    }
  }
}
</script>

<style lang="css">
</style>
