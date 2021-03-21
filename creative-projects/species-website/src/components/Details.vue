<template>
<div class="wrapper">
    <div class="animal">
      <div class="image">
        <img :src="'/images/animals/' + animal().image + '.jpg'">
      </div>
      <div class="info">
        <h1>{{animal().common_name}}</h1>
        <p>{{animal().scientific_name}}<p>
        <h2>{{animal().habitat}}</h2>
        <p><strong>Description: </strong>{{animal().description}}</p>
      </div>
    </div>
</div>
</template>

<script>
export default {
  name: 'Details',
  methods: {
      animal() {
          return this.$root.$data.currentAnimal;
      }
  }
}
</script>

<style scoped>
.wrapper {
  display: flex;
  align-self: center;
}

.animal {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  min-width: 200px;
}

.animal img {
  border: 2px solid #333;
  height: 250px;
  width: 250px;
  object-fit: cover;
}

.animal .image {
  display: flex;
  justify-content: center;
}

.info {
  background: whitesmoke;
  color: #000;
  height: 250px;
  padding: 10px 30px;
}

.info h1 {
  font-size: 24px;
}

.info h2 {
  font-size: 18px;
}

.info p {
  margin: 0px;
  font-size: 12px;
}

button {
  height: 50px;
  background: #000;
  color: white;
  border: none;
}
</style>
