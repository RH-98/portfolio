<template>
<div class="admin">
  <h2 class="logout">{{user.firstName}} {{user.lastName}} <a href="/" @click="logout"><i class="fas fa-sign-out-alt"></i></a></h2>
  <h1 id="admin_header">User Contributions</h1>
  <br />
    <div class="heading">
      <div class="circle"></div>
      <h2>Add an Animal</h2>
    </div>
    <div class="add">
      <div class="form">
        <input v-model="name" placeholder="Name">
        <p></p>
        <input v-model="sci_name" placeholder="Scientific Name">
        <p></p>
        <input v-model="habitat" placeholder="Habitat">
        <p></p>
        <input v-model="status" placeholder="Status">
        <p></p>
        <div class='description'>
          <textarea v-model="description" placeholder="Description"></textarea>
          <p></p>
        </div>
        <input type="file" name="photo" @change="fileChanged">
        <button @click="upload">Upload</button>
      </div>
      <div class="upload" v-if="addAnimal">
        <h2>{{addAnimal.name}}</h2>
        <img :src="addAnimal.path" />
      </div>
    </div>
    <div class="heading">
      <div class="circle"></div>
      <h2>Edit/Delete an Animal</h2>
    </div>
    <div class="edit">
      <div class="form">
        <input v-model="findName" placeholder="Search">
        <div class="suggestions" v-if="suggestions.length > 0">
          <div class="suggestion" v-for="s in suggestions" :key="s._id" @click="selectAnimal(s)">{{s.name}}
          </div>
        </div>
      </div>
      <div class="upload" v-if="findAnimal">
        <input v-model="findAnimal.name">
        <p></p>
        <input v-model="findAnimal.status">
        <p></p>
        <textarea v-model="findAnimal.description" placeholder="New Description"></textarea>
        <p></p>
        <img :src="findAnimal.path" />
      </div>
      <div class="actions" v-if="findAnimal">
        <button @click="deleteAnimal(findAnimal)">Delete</button>
        <button @click="editAnimal(findAnimal)">Edit</button>
      </div>
    </div>
</div>
</template>

<script>
import axios from 'axios';
export default {
  name: 'Admin',
  data() {
    return {
      name: "",
      sci_name: "",
      habitat: "",
      status: "",
      file: null,
      description: "",
      addAnimal: null,
      animals: [],
      findName: "",
      findAnimal: null,
    }
  },
  computed: {
    suggestions() {
      let animals = this.animals.filter(animal => animal.name.toLowerCase().startsWith(this.findName.toLowerCase()));
      return animals.sort((a, b) => a.name > b.name);
    },
    user() {
      return this.$root.$data.user;
    },
  },
  created() {
    this.getAnimals();
  },
  methods: {
    async logout() {
      try {
        await axios.delete("/api/users");
        this.$root.$data.user = null;
      } catch (error) {
        this.$root.$data.user = null;
      }

    },
    fileChanged(event) {
      this.file = event.target.files[0]
    },
    async upload() {
      try {
        const formData = new FormData();
        formData.append('photo', this.file, this.file.name)
        let r1 = await axios.post('/api/animals/photos', formData);
        let r2 = await axios.post('/api/animals', {
          name: this.name,
          sci_name: this.sci_name,
          habitat: this.habitat,
          status: this.status,
          path: r1.data.path,
          description: this.description,
        });
        this.addAnimal = r2.data;
        this.getAnimals();
        console.log(this.addAnimal)
      } catch (error) {
        console.log(error);
      }
    },
    async getAnimals() {
      try {
        let response = await axios.get("/api/animals");
        console.log(this.animals)
        this.animals = response.data;
        console.log(this.animals)
        return true;
      } catch (error) {
        console.log(error);
      }
    },
    selectAnimal(animal) {
      this.findName = "";
      this.findAnimal = animal;
    },
    async deleteAnimal(animal) {
      try {
        await axios.delete("/api/animals/" + animal._id);
        this.findAnimal = null;
        this.getAnimals();
        return true;
      } catch (error) {
        console.log(error);
      }
    },
    async editAnimal(animal) {
      try {
        await axios.put("/api/Animals/" + animal._id, {
          name: animal.name,
          status: animal.status,
          description: animal.description,
        });
        this.findAnimal = null;
        this.getAnimals();
        return true;
      } catch (error) {
        console.log(error);
      }
    },
  }
}
</script>


<style scoped>
.admin {
  padding-left: 10%;
  display: flex;
  width: 90%;
  flex-direction: column;
  align-content: center;
  justify-content: center;
}

.admin h1 {
  text-align: center;
}

.image h2 {
  font-style: italic;
  font-size: 1em;
}

.heading {
  display: flex;
  text-justify: center;
  margin-bottom: 20px;
  margin-top: 20px;
}

.heading h2 {
  margin-top: 8px;
  margin-left: 10px;
}

#admin_header {
  align-self: center;
  font-style:italic;
  margin: 0px;
}

.add,
.edit {
  display: flex;
}

.circle {
  margin-top: 12px;
  border-radius: 50%;
  width: 18px;
  height: 18px;
  padding: 8px;
  background: #333;
  color: #fff;
  text-align: center
}

/* Form */
input,
textarea,
select,
button {
  font-family: 'Montserrat', sans-serif;
  font-size: 1em;
}

.form {
  margin-right: 50px;
}

/* Uploaded images */
.upload h2 {
  margin: 0px;
}

.upload img {
  max-width: 300px;
}

/* Suggestions */
.suggestions {
  width: 200px;
  border: 1px solid #ccc;
}

.suggestion {
  min-height: 20px;
}

.suggestion:hover {
  background-color: #5BDEFF;
  color: #fff;
}

.logout {
  margin-left: 70%;
  display: flex;
  flex-direction: row;
  align-content: space-between;
  justify-content: center;
}

.logout * {
  padding-left: 5px;
  color: black;
}
</style>