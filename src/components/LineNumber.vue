<template lang="html">
    <div class="character">
      {{ lineNumber }}
    </div>
</template>

<script>
export default {
  props: ['lineNumber']
}
</script>

<style lang="css" scoped>

.character {
  display: inline-block;
  padding-right: 1em;
}
</style>
