<template>
  <div>
    <nav class="navbar navbar-expand-lg navbar-light bg-light">
      <ul class="navbar-nav">
        <Timer />
      </ul>
    </nav>
  </div>
</template>

<script>
import Timer from './Timer'
export default {
  name: 'Navbar',
  components:{
    Timer
  }
}
</script>

<style>

</style>