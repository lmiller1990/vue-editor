<template lang="html">
<span>
  <div class="tab" v-for="file in getBufferedFiles" @click="setActiveTab(file)">
    {{ file.name }}
  </div>
</span>
</template>

<script>
import { mapState } from 'vuex'
export default {
  computed: {
    ...mapState({
      getBufferedFiles: state => state.file.files
    })
  },
  methods: {
    setActiveTab (file) {
      console.log(`Setting active file: ${file.id} ${file.name}`)
    }
  }
}
</script>

<style lang="css" scoped>
.tab {
  display: inline-block;
  font-family: "Courier New", monospace;
  font-size: 1em;
  margin-right: 0.5em;
}


</style>
