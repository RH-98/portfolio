<template>
<div class="wrapper">
  <div v-if="favorites.length == 0">
      <h1>No Favorite Animals!</h1>
  </div>
  <div class="animals">
    <div class="animal" v-for="favorite in favorites" :key="favorite._id">
      <div class="image">
        <img :src="favorite.animal.path">
      </div>
      <div class="info">
        <h1>{{favorite.animal.name}}</h1>
        <p>{{favorite.animal.habitat}}</p>
      </div>
      <div class="price">
        <button v-on:click="removeFromFavorites(favorite)" class="auto">Remove</button>
      </div>
    </div>
  </div>
</div>
</template>

<script>
import axios from 'axios';
export default {
  name: 'FavoriteList',
  data() {
    return {
      animals: [],
      favorites: [],
    }
  },
  created() {
    this.getAnimals();
    this.getFavorites();
  },
  methods: {
    async getFavorites(){
          try {
          const response = await axios.get(`/api/favorites`);
          console.log(response.data)
          this.favorites = response.data;
          console.log(this.favorites)
        } catch (error) {
          console.log("There was a problem!")
          console.log(error);
        }
    },
    async removeFromFavorites(favorite) {
      try {
        await axios.delete(`/api/favorites/${favorite.animal._id}`);
        this.getFavorites();
        return true;
      } catch (error) {
        console.log(error);
      }
    },
    async getAnimals() {
      try {
        let response = await axios.get("/api/animals");
        this.animals = response.data;
        return true;
      } catch (error) {
        console.log(error);
      }
    },
  }
}
</script>

<style scoped>
.wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
}

.animals {
  margin-top: 20px;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
}

.animal {
  display: flex;
  flex-direction: column;
  text-align: center;
  margin: 10px;
  margin-top: 50px;
  width: 300px;
}

.animal img {
  border: 2px solid #333;
  height: 300px;
  width: 300px;
  object-fit: cover;
}

.animal .image {
  display: flex;
  justify-content: center;
}

.info {
  background: #000;
  color: white;
  padding: 10px 30px;
  height: 80px;
  text-align: center;
  margin-bottom: 5px;
}

.info h1 {
  font-size: 18px;
}

.info h2 {
  font-size: 14px;
}

.info p {
  margin: 0px;
  font-size: 14px;
}


.buttons {
  display: flex;
  flex-direction: row;
  justify-content: space-around;
}

button {
  height: 50px;
  background: lightseagreen;
  color: #000;
  border: none;
}
</style>