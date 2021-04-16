<template>
<div class="loginPage">
  <div class="websiteInfo">
    <h1>Join Us!</h1>
    <img src="/images/animals_collage.jpg">
    <h3> Our goal here at <em>Animal Haven</em> is to bring to your awareness the 
      beauty of the endangered creatures of our world! We value your 
      contributions and we hope that you will add to this list and find
      ways to promote animal conservation!
    </h3>
  </div>
  <div class="hero">
    <div class="heroBox">
      <form class="pure-form">
        <fieldset>
          <legend>Register for an account</legend>
          <input placeholder="first name" v-model="firstName">
          <input placeholder="last name" v-model="lastName">
        </fieldset>
        <fieldset>
          <input placeholder="username" v-model="username">
          <input type="password" placeholder="password" v-model="password">
        </fieldset>
        <fieldset>
          <button type="submit" class="pure-button pure-button-primary" @click.prevent="register">Register</button>
        </fieldset>
      </form>
      <p v-if="error" class="error">{{error}}</p>
      <form class="pure-form space-above">
        <fieldset>
          <legend>Login</legend>
          <input placeholder="username" v-model="usernameLogin">
          <input type="password" placeholder="password" v-model="passwordLogin">
        </fieldset>
        <fieldset>
          <button type="submit" class="pure-button pure-button-primary" @click.prevent="login">Login</button>
        </fieldset>
      </form>
      <p v-if="errorLogin" class="error">{{errorLogin}}</p>
    </div>
  </div>
</div>
</template>

<script>
import axios from 'axios';
export default {
  name: 'Login',
  data() {
    return {
      firstName: '',
      lastName: '',
      username: '',
      password: '',
      usernameLogin: '',
      passwordLogin: '',
      error: '',
      errorLogin: '',
    }
  },
  methods: {
    async register() {
      this.error = '';
      this.errorLogin = '';
      if (!this.firstName || !this.lastName || !this.username || !this.password)
        return;
      try {
        let response = await axios.post('/api/users', {
          firstName: this.firstName,
          lastName: this.lastName,
          username: this.username,
          password: this.password,
        });
        this.$root.$data.user = response.data.user;
      } catch (error) {
        this.error = error.response.data.message;
        this.$root.$data.user = null;
      }
    },
    async login() {
      this.error = '';
      this.errorLogin = '';
      if (!this.usernameLogin || !this.passwordLogin)
        return;
      try {
        let response = await axios.post('/api/users/login', {
          username: this.usernameLogin,
          password: this.passwordLogin,
        });
        this.$root.$data.user = response.data.user;
      } catch (error) {
        this.errorLogin = "Error: " + error.response.data.message;
        this.$root.$data.user = null;
      }
    },
  }
}
</script>

<style scoped>
.loginPage {
  display: flex;
  padding: 50px;
  padding-top: 0px;
  flex-direction: row;
  justify-content: space-evenly;
}

img {
  max-width:fit-content;
}
.websiteInfo {
  width: 45%;
  text-align: center;
}

.space-above {
  margin-top: 50px;
}

h1 {
  font-size: 40px;
  padding-bottom: 20px;
  margin: 0px;
}

.hero {
  width: 45%;
  display: flex;
  justify-content: center;
}

.heroBox {
  text-align: center;
}

.hero form {
  font-size: 14px;
}

.hero form legend {
  font-size: 20px;
}

input {
  margin-right: 10px;
}

.error {
  margin-top: 10px;
  display: inline;
  padding: 5px 20px;
  border-radius: 30px;
  font-size: 10px;
  background-color: #d9534f;
  color: #fff;
}
button {
  background-color: lightseagreen;
}
</style>