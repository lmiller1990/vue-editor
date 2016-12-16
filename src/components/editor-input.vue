<template lang="html">
  <div class="editor-container">
    <!-- <input type="text" v-model="userInput" v-on:keydown.prevent="update"> -->
    <sidebar :lines="lines"></sidebar>
    <editor-line :lines="lines"></editor-line>
    <pre>
      <!-- {{ $data }} -->
    </pre>
  </div>
</template>

<script>
import line from './EditorLine.vue'
import sidebar from './Sidebar.vue'
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

<style lang="css" scoped>
.editor-container {
  display: flex;
  background-color: yellow;
}
</style>
