<template>
<div class='home'>
  <div v-if="user">
    <div class="wrapper">
      <div class="search">
        <form class="pure-form">
          <i class="fas fa-search"></i><input v-model="searchText" />
        </form>
      </div>
    </div>
    <AnimalList :animals="animalList" />
  </div>
  <Login v-else />
</div>
</template>

<script>
import axios from 'axios';
import AnimalList from "../components/AnimalList.vue"
import Login from "../components/Login.vue"
export default {
  name: 'Home',
  components: {
    AnimalList,
    Login
  },
  data() {
    return {
      searchText: '',
      animals: [],
    }
  },
  async created() {
    this.getAnimals();
    try {
      let response = await axios.get('/api/users');
      this.$root.$data.user = response.data.user;
    } catch (error) {
      this.$root.$data.user = null;
    }
  },
  computed: {
    animalList() {
      return this.animals.filter(animal => animal.name.toLowerCase().search(this.searchText.toLowerCase()) >= 0);
    },
    user() {
      return this.$root.$data.user;
    }
  },
  methods: {
    async getAnimals() {
      try {
        let response = await axios.get("/api/animals");
        this.animals = response.data;
        return true;
      } catch (error) {
        console.log(error);
      }
    },
  },
}
</script>

<style scoped>
.wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
}

.search {
  border: 1px solid #ccc;
  border-radius: 4px;
  width: 50%;
}

form {
  display: table;
  width: 100%;
}

i {
  display: table-cell;
  padding-left: 10px;
  width: 1px;
}

input {
  display: table-cell;
  font-size: 20px;
  border: none !important;
  box-shadow: none !important;
  width: 100%;
  height: 40px;
}
</style>
