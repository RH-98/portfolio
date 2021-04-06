<template>
<div class="wrapper">
    <div class="animal">
      <div class="image">
        <img :src="animal.path">
      </div>
      <div class="info">
        <h1>{{animal.name}}</h1>
        <p>{{animal.sci_name}}<p>
        <h2>{{animal.habitat}}</h2>
        <p><strong>Description: </strong>{{animal.description}}</p>
        <br>
        <p><strong>Status: </strong>{{animal.status}}</p>
      </div>
    </div>
    <div class="comments" v-for="comment in comments" :key="comment._id">
      <div class="commentArea">
        <h2>{{comment.user}}</h2>
        <p>{{comment.comment}}</p>
        <button @click="deleteComment(comment._id)">Delete</button>
      </div>
    </div>
      <p></p>
      <form @submit.prevent="addComment">
        <input v-model="user" placeholder="Username">
        <p></p>
        <textarea v-model="commentSpace" placeholder="Comment here!"></textarea>
        <p></p>
        <button type="submit">Add Comment</button>
      </form>
    <br>
</div>
</template>

<script>
import axios from 'axios';
export default {
  name: 'Details',
  data() {
    return {
      user: "",
      commentSpace: "",
      comments: [],
    }
  },
  created() {
    this.animal = this.$root.$data.currentAnimal;
    this.getComments();
  },
  methods: {
      async getComments(){
          try {
          const response = await axios.get(`/api/animals/${this.animal._id}/comments`);
          console.log(response.data)
          this.comments = response.data;
          console.log(this.comments)
        } catch (error) {
          console.log("There was a problem!")
          console.log(error);
        }
      },
      async addComment() {
        try {
          await axios.post(`/api/animals/${this.animal._id}/comments`, {
            user: this.user,
            comment: this.commentSpace,
          });
          this.user = "";
          this.comment = "";
          this.getComments();
        } catch (error) {
          console.log(error);
        }
      },
      async deleteComment(comment_id) {
        try {
          await axios.delete(`/api/animals/${this.animal._id}/comments/${comment_id}`);
          this.comments = this.getComments();
        } catch (error) {
          console.log(error);
        }
      },
  }
}
</script>

<style scoped>
.wrapper {
  max-width: 80%;
  display: flex;
  flex-direction: column;
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
  align-self: center;
  height: 50px;
  background: #000;
  color: white;
  border: none;
}

.commentArea {
  width: 70%;
  margin-top: 30px;
  display: flex;
  flex-direction: row;
  align-content: center;
  justify-content: space-around;
  text-justify: center;
}

.commentArea h2 {
  padding-right: 20px;
}

.commentArea p {
  flex: 4;
  padding-top: 10px;
  text-align: left;
}
.commentArea button {
  flex: 1,
}

</style>
