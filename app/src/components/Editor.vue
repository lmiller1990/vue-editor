<template lang="html">
  <div>
    <button id="loadFile" @click="load">Load File</button>

    <!-- <input type="file" name="files[]" id="files" v-on:change="filesSelected" multiple> -->
    <editor-input></editor-input>
    <container></container>
    <div class="debug">
      Debug:
      <p>Column: {{ $store.state.cursor.currentColumnNumber }}</p>

      <p>Line: {{ $store.state.cursor.currentLineNumber }}</p>
        Content: {{ getWorkingLineContent }}
      </p>
    </div>
  </div>
</template>

<script>
import container from './EditorMainContainer.vue'
import editorinput from './EditorInput.vue'

import {
  mapState,
  mapMutations,
  mapGetters
} from 'vuex'

export default {
  components: {
    container,
    'editor-input': editorinput
  },
  created () {
    console.log(this.$electron)
    const ipc = this.$electron.ipcRenderer
    ipc.send('asynchronous-message', 'ping')

    ipc.on('asynchronous-reply', function (event, arg) {
      const message = `Asynchronous message reply: ${arg}`
      console.log(message)
    })
  },
  computed: {
    ...mapState([
      'currentFile',
      'currentColumnNumber'
    ]),
    ...mapGetters([
      'getWorkingLineContent'
    ])
  },
  methods: {
    ...mapMutations([
      'setCurrentFile'
    ]),
    load () {
      this.$store.dispatch('addFile', { file: '/app/src/components/Test.vue' })
    }
  }
}
</script>

<style lang="css" scoped>
.debug {
  font-size: 1rem;
  border: solid 1px grey;
  margin-top: 5em;
}
</style>
