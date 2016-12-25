<template lang="html">
  <div>
    <button id="loadFile" @click="load">Load File</button>
    <button id="saveFile" @click="save">Save File</button>

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
import { ipc } from 'electron'

import { mapState, mapMutations, mapGetters } from 'vuex'

export default {
  components: {
    container,
    'editor-input': editorinput
  },
  created () {

  },
  computed: {
    ...mapState({
      currentFile: state => state.file.currentFile,
      currentColumnNumber: state => state.cursor.currentColumnNumber
    }),
    ...mapGetters([
      'getWorkingLineContent'
    ])
  },
  methods: {
    ...mapMutations([
      'setCurrentFile'
    ]),
    save () {
      const self = this
      const ipc = this.$electron.ipcRenderer
      console.log("Sending saveFile message")
      console.log(self.currentFile.lines)
      ipc.send('saveFile', self.currentFile.lines)
    },
    load () {
      const self = this
      const ipc = this.$electron.ipcRenderer
      ipc.send('loadFile', 'Test.vue')

      ipc.on('fileLoaded', function (event, arg) {
        self.$store.dispatch('addFile', { lines: arg })
      })
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
