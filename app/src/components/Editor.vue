<template lang="html">
  <div>
    Editor
    <input type="file" name="files[]" id="files" v-on:change="filesSelected" multiple>
    <editor-input></editor-input>
    <container></container>
    <div class="debug">
      Debug:
      <p>Line: {{ $store.state.cursor.currentLineNumber }}
        Length: {{ $store.state.currentFile.lines[$store.state.cursor.currentLineNumber].content.length }}</p>
      <p>Column: {{ $store.state.cursor.currentColumnNumber }}</p>
      <p>
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
  created() {
    this.setCurrentFile(1)
    // this.readTextFileAsync('app/src/Components/Test.vue')
    //   .then(function (val) {
    //   })
    this.$store.dispatch('addFile', { file: 'app/src/Components/Test.vue' })
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
