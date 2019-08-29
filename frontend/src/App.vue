<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>

export default {
  name: 'app',
  created(){
    var state = JSON.parse(localStorage.getItem('state'))
    if (state){
      this.$store.dispatch('update_state', state)
    }
    setInterval(()=>{
      localStorage.setItem('state',JSON.stringify(this.$store.state))
    }, 10000)
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
html{
  overflow-x:hidden;
}
</style>
