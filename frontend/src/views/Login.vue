<template>
  <div>
    <b-card style="max-width:25rem;" class="m-auto mt-2">
      <img src="../assets/images/logo1.png" alt="">
      <b-card-text>Increase your productivity anywhere</b-card-text>
      <b-card-text>Complete tasks <span>✔️</span></b-card-text>
      <b-card-text>Achieve goals <span>🚩</span></b-card-text>
      <b-card-text>Reward yourself <span>🥳 🎊 🎉</span></b-card-text>
      <b-form @submit.prevent="login">
        <b-form-group>
          <b-form-input
            v-model="form.email"
            type="email"
            required
            placeholder="Email">
          </b-form-input>
        </b-form-group>
        <b-form-group>
          <b-form-input
            v-model="form.password"
            type="password"
            placeholder="Password"
            required>
          </b-form-input>
        </b-form-group>
        <b-card-text>
          <router-link to="/">Forgot password?</router-link>
        </b-card-text>
        <b-button type="submit" variant="success">Login</b-button>
      </b-form>
    </b-card>
  </div>
</template>

<script>
export default {
  name: 'Login',
  data(){
    return{
      form: {
        email: '',
        password: ''
      }
    }
  },
  methods:{
    login(){
      
    }
  }
}
</script>

<style>

</style>