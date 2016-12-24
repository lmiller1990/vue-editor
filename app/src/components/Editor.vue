<template lang="html">
  <div>
    <button id="loadFile" @click="load">Load File</button>
    <input type="file" name="files[]" id="files" v-on:change="filesSelected" multiple>
    <editor-input></editor-input>
    <container></container>
    <div class="debug">
      Debug:
      <!-- <p>Current File: {{ $store.getters.getCurrentFile }} -->

        <!-- Length: {{ $store.state.file.currentFile.lines[$store.state.cursor.currentLineNumber].content.length }}</p> -->
      <p>Column: {{ $store.state.cursor.currentColumnNumber }}</p>

      <p>Line: {{ $store.state.cursor.currentLineNumber }}</p>
        Content: {{ getWorkingLineContent }}
        <!-- Loaded Files: {{ $store.state.file.files }} -->
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
      this.$store.dispatch('addFile', { file: 'app/src/Components/Test.vue' })
    },
    filesSelected(evt) {
      let input = evt.target

      var reader = new FileReader()
      reader.onload = function() {
        var text = reader.result
        console.log(reader.result)
      };
      reader.readAsText(input.files[0])
    },
    readTextFileAsync(file) {

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
