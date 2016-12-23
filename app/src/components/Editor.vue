<template lang="html">
  <div>
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
    this.readTextFileAsync('app/src/Components/Test.vue')
      .then(function (val) {
        console.log("File contents: ",val)
      })
    // this.$store.dispatch('addFile', { content: fileContent })
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
    readTextFile(file) {
      var rawFile = new XMLHttpRequest();
      rawFile.open("GET", file, false);
      rawFile.onreadystatechange = function() {
        if (rawFile.readyState === 4) {
          if (rawFile.status === 200 || rawFile.status == 0) {
            var allText = rawFile.responseText;
            return allText
            // console.log(allText)
          }
        }
      }
    },
    readTextFileAsync(file) {
      return new Promise(function (resolve, reject) {
        var rawFile = new XMLHttpRequest();
        rawFile.open("GET", file, false);
        rawFile.onreadystatechange = function () {
          if (rawFile.status === 200 || rawFile.status == 0) {
            resolve(rawFile.responseText)
          }
        }
        rawFile.send()
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
