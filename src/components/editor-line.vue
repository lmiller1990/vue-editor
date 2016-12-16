<template lang="html">
  <div>
    {{ line.id }}
    <span v-for="word in breakBySpace(line)">{{ word }}</span>
  </div>
</template>

<script>
export default {
  props: ['line'],
  methods: {
    breakBySpace () {
      return this.line.content.split(" ")
    }
  }
}
</script>

<style lang="css">
</style>
