<template>
  <div v-if="show_alert" :class="alert.error ? 'text-left alert alert-danger':'text-left alert alert-warning'" role="alert">
    <button type="button" class="close" data-dismiss="alert" aria-label="Close">
      <span @click="dismiss" aria-hidden="true" class="ml-3">&times;</span>
    </button>
    {{ alert.message }}
  </div>
</template>

<script>
export default {
  name: 'Alert',
  data(){
    return {
      show_alert:true
    }
  },
  props: {
    alert:{
      type: Object,
      required: true
    }
  },
  methods:{
    dismiss(){
      this.show_alert = false
      this.$store.dispatch('remove_alert', this.alert)
    }
  }
}
</script>

<style scoped>

</style>