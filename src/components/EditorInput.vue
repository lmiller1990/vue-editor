<template lang="html">
  <div>
    <input type="text" v-model="userInput" v-on:keydown.prevent="update">
  </div>
</template>

<script>
import { isPrintableKey } from '../utils/keyManager'
import { mapMutations, mapActions } from 'vuex'

export default {
  data () {
    return {
      userInput: ''
    }
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
      if (event.keyCode == 40)
        this.moveDown()

      if (event.keyCode == 38) {
        this.moveUp()
      }
      if (event.keyCode == 37)
        this.moveLeft()

      if (event.keyCode == 39)
        this.moveRight()

      if (event.keyCode == 8) {
        // backspace
        this.removeCurrentCharacter()
        this.moveCursorBackOneUnit()
      }
    },
    ...mapMutations([
      'addLine',
      'removeCurrentCharacter',
      'moveCursorBackOneUnit'
    ]),
    ...mapActions([
      'moveRight',
      'moveLeft',
      'moveUp',
      'moveDown'
    ])
  }
}
</script>

<style lang="css">
</style>
