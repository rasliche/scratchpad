<template>
  <div>
    <nav class="pt-3 pb-3 mb-3 navbar fixed-top navbar-expand-lg navbar-light bg-light">
      <ul class="navbar-nav">
        <li class="nav-item">
          <Timer />
        </li>
        <li class="nav-item">
          <StorageState />
        </li>
        <li class="nav-item">
          <p class="mb-0 p-2"><router-link to="/"> Home</router-link></p>
        </li>
        <li class="nav-item">
          <p class="mb-0 p-2">
            <font-awesome-icon icon="cog" /><router-link to="/settings"> Settings</router-link>
          </p>
        </li>
      </ul>
    </nav>
  </div>
</template>

<script>
import Timer from './Timer'
import StorageState from './StorageState'
export default {
  name: 'Navbar',
  components:{
    Timer,
    StorageState
  }
}
</script>

<style>

</style>