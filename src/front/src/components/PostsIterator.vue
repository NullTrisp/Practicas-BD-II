<template>
  <div>
    <v-card class="cardIterator" v-for="(post, i) in posts" :key="i">
      <v-card-title> {{ post.title }} </v-card-title>
      <v-card-text> {{ post.content }}</v-card-text>
      <v-btn class="ma-2" color="blue" width="10em">
        <v-icon>mdi-pen</v-icon>
        Edit
      </v-btn>
      <v-btn
        class="ma-2"
        color="red"
        width="10em"
        @click="deletePost(post.title)"
      >
        <v-icon>mdi-delete</v-icon>
        Delete
      </v-btn>
    </v-card>
  </div>
</template>

<script>
import axios from "axios";
export default {
  components: {},
  props: {
    postsRecieved: Array,
  },
  data() {
    return {
      posts: this.$props.postsRecieved,
      post: "",
    };
  },
  methods: {
    editPost() {},

    deletePost(title) {
      axios
        .delete(
          `http://localhost:4000/post/${this.$store.state.userInSession}/${title}`
        )
        .then(() => {
          alert("Post Deleted succesfully");
          this.$router.go();
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
};
</script>

<style>
.cardIterator {
  margin-bottom: 2em;
}
</style>
