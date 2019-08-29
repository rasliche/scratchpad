<template>
  <div :class="alert.type">
    <p>{{ alert.message }}</p>
  </div>
</template>

<script>
export default {
  name: 'Alert',
  props: {
    alert:{
      type: Object,
      required: true
    }
  }
}
</script>

<style scoped>

</style>