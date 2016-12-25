<template lang="html">
  <div>
    <TabsContainer></TabsContainer>
    <button id="loadFile" @click="load">Load File</button>
    <button id="saveFile" @click="save">Save File</button>


    <editor-input></editor-input>
    <container></container>
    <div class="debug">
      Debug Information:
      <p>Column: {{ $store.state.cursor.currentColumnNumber }}</p>
      <p>Line: {{ $store.state.cursor.currentLineNumber }}</p>
      Current File: <p v-if="$store.state.file.currentFile"> {{ $store.state.file.currentFile.name }}</p>
    </div>
  </div>
</template>

<script>
import container from './EditorMainContainer.vue'
import editorinput from './EditorInput.vue'
import { ipc, remote } from 'electron'
import TabsContainer from './TabsContainer'

import { mapState, mapMutations, mapGetters } from 'vuex'

export default {
  components: {
    container,
    'editor-input': editorinput,
    TabsContainer
  },
  created () {
    const self = this
    let ipc = this.$electron.ipcRenderer
    ipc.on('fileLoaded', function (event, file) {
      self.$store.dispatch('addFileToBuffer', {
        path: file.path,
        lines: file.lines
      })
    })
  },
  computed: {
    ...mapState({
      currentFile: state => state.file.currentFile,
      currentColumnNumber: state => state.cursor.currentColumnNumber,
      files: state => state.file.files
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
      console.log(`Saved ${self.currentFile.name}`)
      ipc.send('saveFile', self.currentFile)
    },
    load () {
      let ipc = this.$electron.ipcRenderer
      let remote = this.$electron.remote
      let files = remote.dialog.showOpenDialog({
        properties: ['openFile', 'openDirectory', 'multiSelections']
      })
      let bufferedFiles = this.$store.state.file.files

      for (let file in files) {
        let newFile = true                // assume file has not been loaded yet
        if (bufferedFiles.length > 0) {   // if no files have been loaded, no need to check
          newFile = bufferedFiles.map((elem) => elem.path == files[file]).every((el) =>  el === false)
        }
        if (newFile) {
          ipc.send('loadFiles', files[file])
        }
      }
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
