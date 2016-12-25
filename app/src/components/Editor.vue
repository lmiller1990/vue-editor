<template lang="html">
  <div>
    <button id="loadFile" @click="load">Load File</button>
    <button id="saveFile" @click="save">Save File</button>

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
import { ipc, remote } from 'electron'


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
      ipc.send('saveFile', self.currentFile)
    },
    load () {
      const self = this
      const ipc = this.$electron.ipcRenderer
      const remote = this.$electron.remote

      let file = remote.dialog.showOpenDialog({properties: ['openFile', 'openDirectory', 'multiSelections']})
      let path = file[0] // return value is name inc. path

      ipc.send('loadFile', file[0]) // send to main thread to load using node filesystem api

      ipc.on('fileLoaded', function (event, arg) {
        self.$store.dispatch('addFile', {
          path: path,
          lines: arg
        })
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
