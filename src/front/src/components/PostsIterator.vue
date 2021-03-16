<template>
  <div>
    <v-card class="cardIterator" v-for="(post, i) in posts" :key="i">
      <v-card-title> {{ post.title }} </v-card-title>
      <v-card-text> {{ post.content }}</v-card-text>
      <BtnComponent icon="pen" content="Edit post" color="light blue" />
      <BtnComponent icon="pen" content="Delete post" color="light red" />
    </v-card>
  </div>
</template>

<script>
import BtnComponent from "@/components/BtnComponent.vue";
import axios from "axios";
export default {
  components: {
    BtnComponent,
  },
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

    deletePost(index) {
      axios
        .delete(`http://localhost:4000/post/TestUsr/posts${index}`)
        .then(() => {})
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
