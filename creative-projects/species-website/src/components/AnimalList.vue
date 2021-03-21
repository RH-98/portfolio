<template>
<div class="wrapper">
  <div class="animals">
    <div class="animal" v-for="animal in animals" :key="animal.id">
      <div class="image">
        <img :src="'images/animals/' + animal.image + '.jpg'">
      </div>
      <div class="info">
        <h1>{{animal.common_name}}</h1>
        <p>{{animal.habitat}}</p>
      </div>
      <div class="buttons">
        <button v-on:click="setCurrentAnimal(animal)" class="auto">
          <router-link to="/animal" style="float: left">
              <p style="color: #000">Details</p>
          </router-link>
        </button>
        <button v-on:click="addToFavorites(animal.id)" class="auto">Favorite <i v-bind:class="[animal.fav ?  'fa-heart' : 'fa-heart-o', 'fa']"></i></button>
      </div>
    </div>
  </div>
</div>
</template>

<script>
export default {
  name: 'animalList',
  props: {
    animals: Array
  },
  methods: {
    setCurrentAnimal(animal) {
      this.$root.$data.currentAnimal = animal;
      console.log(animal)
    },
    addToFavorites(animal) {
      let newAnimal = this.$root.$data.animals[animal-1]
      var found = false;
      for(var i = 0; i < this.$root.$data.favorites.length; i++) {
        if (this.$root.$data.favorites[i].id == newAnimal.id) {
          found = true;
          newAnimal.fav = false;
          this.$root.$data.favoriteTotal -= 1;
          this.$root.$data.favorites.splice(i, 1);
        }
      }
      if (!found) {
        newAnimal.fav = true;
        this.$root.$data.favoriteTotal += 1;
        this.$root.$data.favorites.push(newAnimal);
      }
      this.$emit('togglefav',!newAnimal.fav);
      this.$forceUpdate();
    }
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
