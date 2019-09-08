<template>  
  <div>
    <b-navbar toggleable="lg" type="dark" class="mb-5">
      <b-navbar-brand href="/">
        <span class="brand-name mr-2">Scratchy</span>
      </b-navbar-brand>
      <span>
        <Timer />
      </span>
      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>
      <b-collapse id="nav-collapse" is-nav>
        <b-navbar-nav>
          <b-nav-item>
            <router-link to="/" class="text-white">
              <font-awesome-icon icon="columns" class="mr-2"/>Dashboard
            </router-link>
          </b-nav-item>
          <b-nav-item>
            <router-link to="/tasks" class="text-white">
              <font-awesome-icon icon="tasks" class="mr-2"/>Tasks    
            </router-link>
          </b-nav-item>
          <b-nav-item href="#">
            <router-link to="/goals" class="text-white">
              <font-awesome-icon icon="flag" class="mr-2"/>Goals
            </router-link>
          </b-nav-item>
        </b-navbar-nav>
        <b-navbar-nav class="ml-auto">
          
          <b-nav-item right>
            <router-link to="/login" class="text-white">
              <font-awesome-icon icon="sign-in-alt" class="mr-2"/>Login
            </router-link>
          </b-nav-item>
          
          <b-nav-item right href="#"><font-awesome-icon icon="user-plus" class="mr-2"/>Register</b-nav-item>
          <b-nav-item right href="#"><font-awesome-icon icon="sign-out-alt" class="mr-2"/>Logout</b-nav-item>
          <b-nav-item right href="#">
            <router-link to="settings" class="text-white">
              <font-awesome-icon icon="cogs" class="mr-2"/>Settings
            </router-link>
          </b-nav-item>
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>
  </div>
</template>

<script>
import {mapState} from 'vuex'
import Timer from '../Timer'
export default {
  name: 'Navbar',
  components:{
    Timer
  },
  computed:{
    ...mapState('timer', ['timerOn'])
  }
}
</script>

<style>
@media screen and (max-width: 990px){
  .navbar-nav{
    flex-direction: column!important;
    display: block!important;
  }
}
.navbar{
  background-color: #4cb09f!important;
}
.brand-name{
  font-weight: 600;
}
</style>