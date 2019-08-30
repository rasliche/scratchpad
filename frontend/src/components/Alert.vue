<template>
  <div :class="alert.error ? 'text-left alert alert-danger':'text-left alert alert-success'">
    {{ alert.message }}
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