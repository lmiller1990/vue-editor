<template lang="html">
  <div class="sidebar">
    <div v-for="line in lines">{{ line.id }}</div>
  </div>
</template>

<script>
export default {
  props: ['lines']
}
</script>

<style lang="css">
.sidebar {
  width: 50px;
  height: auto;
}
</style>
