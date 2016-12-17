<template lang="html">
  <div class="line number">
    {{ lineNumber }}
  </div>
</template>

<script>
export default {
  props: ['lineNumber']
}
</script>

<style lang="css">
.line.number {
  flex-grow: 1
}
</style>
