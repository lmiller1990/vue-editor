<template lang="html">
  <div>
    <input type="text" v-model="userInput" v-on:keydown.prevent="update">
  </div>
</template>

<script>
import { isPrintableKey } from '../utils/keyManager'
import { mapMutations, mapState, mapGetters } from 'vuex'

export default {
  data () {
    return {
      userInput: ''
    }
  },
  created () {
    this.setCurrentLine(0)
    this.userInput = this.getCurrentLineContent
  },
  computed: {
    ...mapGetters([
      'getCurrentLineContent'
    ])
  },
  methods: {
    update (event) {
      console.log(event)
      if (isPrintableKey(event.keyCode)) {
        this.userInput += event.key
      }
      if (event.keyCode == 13) {
        // return key
        console.log(this.userInput)
        this.addLine(this.userInput)
      }
      if (event.keyCode == 40)  {
        this.changeLine('down')
      }
      if (event.keyCode == 38) {
        this.changeLine('up')
      }
      if (event.keyCode == 37)  {
        this.changeColumn('left')
      }
      if (event.keyCode == 39) {
        this.changeColumn('right')
      }
      if (event.keyCode == 8) {
        // backspace
        this.removeCurrentCharacter()
        this.moveCursorBackOneUnit()
      }
    },
    ...mapMutations([
      'addLine',
      'changeLine',
      'changeColumn',
      'setCurrentLine',
      'removeCurrentCharacter',
      'moveCursorBackOneUnit'
    ])
  }
}
</script>

<style lang="css">
</style>
