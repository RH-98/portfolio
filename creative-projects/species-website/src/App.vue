<template>
<div id="app">
  <div id="menu">
    <div id="brand">
      <router-link to="/">
        <img src="/images/logo.png">
      </router-link>
    </div>
    <div id="side">
      <router-link to="/favorites">
        <div class="menu-item">
          <img src="/images/love.png">
          <p>{{favoriteTotal}} Favorites</p>
        </div>
      </router-link>
    </div>
  </div>
  <router-view />
</div>
</template>

<script>
export default {
  computed: {
    favoriteTotal() {
      return this.$root.$data.favoriteTotal;
    }
  }
}
</script>


<style>
* {
  box-sizing: border-box;
}

body {
  padding-bottom: 50px;
}

.app {
  margin: 50px 100px;
}

#menu {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-column-gap: 5px;
  grid-template-areas: "none brand side";
  margin-bottom: 50px;
}

#menu a {
  color: #000;
}

#brand {
  grid-area: brand;
  display: flex;
  justify-content: center;
}

#brand img {
  height: 200px;
}

#side {
  grid-area: side;
  display: flex;
  justify-content: flex-end;
}

#side img {
  width: 50px;
}

.menu-item {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.menu-item p {
  margin: 0px;
}

.fixed-footer{
    width: 100%;
    position: fixed;        
    background-color: lightseagreen;
    color: white;
    padding: 10px 0;
    bottom: 0;
    text-align: left;
}

.container{
    width: 90%;
    margin: 0 auto; /* Center the DIV horizontally */
}
</style>