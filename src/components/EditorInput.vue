<template lang="html">
  <div>
    <input type="text" v-model="userInput" v-on:keydown.prevent="update">

  </div>
</template>

<script>
import { isPrintableKey } from '../utils/keyManager'
import { mapMutations } from 'vuex'

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
      if (event.keyCode == 38)  {
        this.changeLine('down')
      }
      if (event.keyCode == 40) {
        this.changeLine('up')
      }
      if (event.keyCode == 37)  {
        this.changeColumn('left')
      }
      if (event.keyCode == 39) {
        this.changeColumn('right')
      }
    },
    ...mapMutations([
      'addLine',
      'changeLine',
      'changeColumn'
    ])
  }
}
</script>

<style lang="css">
</style>
