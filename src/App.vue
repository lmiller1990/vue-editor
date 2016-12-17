<template>
  <div id="app">
    <editor>

    </editor>
  </div>
</template>

<script>
import editor from './components/Editor.vue'

export default {
  components: {
    editor
  }
}
</script>

<style scoped>
#app {
  font-family: "Courier New", monospace;
  font-size: 2em;
}
</style>
