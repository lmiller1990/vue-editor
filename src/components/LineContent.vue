<template lang="html">
  <div class="line content">{{ line.content }}</div>
</template>

<script>
export default {
  props: ['line']
}
</script>

<style lang="css">
.line.content {
  flex-grow: 30
}
</style>
