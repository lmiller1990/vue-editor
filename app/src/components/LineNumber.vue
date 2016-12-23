<template lang="html">
    <div class="character">
      {{ line.id }}
    </div>
</template>

<script>
export default {
  props: ['line']
}
</script>

<style lang="css" scoped>
.character {
  display: inline-block;
  padding-right: 1em;
}
</style>
