<template lang="html">
  <div class="">
    <div v-for="line in lines" class="editor line">{{ line.content }}
    </div>
  </div>
</template>

<script>
export default {
  props: ['lines'],
  methods: {
    breakBySpace () {
      return this.line.content.split(" ")
    }
  }
}
</script>

<style lang="css" scoped>
.editor-line {
  flex-grow: 1;
  background-color: blue;
}
</style>
