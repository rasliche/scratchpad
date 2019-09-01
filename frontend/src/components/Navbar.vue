<template>
  <div>
    <nav class="pt-3 pb-3 mb-3 navbar fixed-top navbar-expand-lg navbar-light bg-light">
      <ul class="navbar-nav">
        <img src="../assets/images/logo1.png" alt="Scratchy logo" class="nav-brand mr-2" height="50">
        <li class="nav-item pt-2">
          <Timer />
        </li>
        <li class="nav-item pt-2">
          <StorageState />
        </li>
        <li class="nav-item pt-2">
          <p class="mb-0 p-2">
            <font-awesome-icon icon="home" class="mr-2" /> <router-link to="/">Home</router-link>
          </p>
        </li>
        <li class="nav-item pt-2">
          <p class="mb-0 p-2">
            <font-awesome-icon icon="cog" class="mr-2" /><router-link to="/settings">Settings</router-link>
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
@media screen and (max-width: 600px) {
  img.nav-brand{
    display: none;
  }
}
</style>