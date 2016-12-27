<template lang="html">
  <div>
    <input type="text" v-model="userInput" v-on:keydown.prevent="update" v-on:keyup.prevent="updateKeyup">
  </div>
</template>

<script>
import { isPrintableKey, meta } from '../utils/keyManager'
import { mapMutations, mapActions } from 'vuex'

export default {
  data () {
    return {
      userInput: '',
      metaKeyDown: false,
      ctrlKeyDown: false
    }
  },
  methods: {
    update (event) {
      if (event.keyCode == 91) this.metaKeyDown = true
      if (event.keyCode == 17) this.ctrlKeyDown = true

      console.log(event.keyCode)

      if (this.metaKeyDown) {
        if (event.keyCode == 221)
          this.gotoLastCharacterOfLine()
      }

      if (isPrintableKey(event.keyCode, this.metaKeyDown, this.ctrlKeyDown)) {
        this.appendCharacter( { character: event.key })
        this.moveRight()
      }
      if (event.keyCode == 13) {
        // return key
        this.addLineBreak()
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
        this.moveLeft()
      }
    },
    updateKeyup (event) {
      if (event.keyCode == 17) this.ctrlKeyDown = false
      if (event.keyCode == 91) this.metaKeyDown = false
    },
    ...mapActions([
      'moveRight',
      'moveLeft',
      'moveUp',
      'moveDown',
      'addLineBreak',
      'removeCurrentCharacter',
      'appendCharacter',
      'gotoLastCharacterOfLine'
    ])
  }
}
</script>

<style lang="css">
</style>
