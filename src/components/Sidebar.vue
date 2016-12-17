<template lang="html">
  <div class="sidebar">
    <div v-for="line in currentFileLines">{{ line.id }}</div>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  computed: {
    ...mapState([
      'currentFile'
    ]),
    currentFileLines () {
      return this.$store.state.currentFile.lines
    }
  }
}
</script>

<style lang="css">
.sidebar {
  width: 50px;
  background-color: red;
  display: inline-block;
}
</style>
