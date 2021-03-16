<template>
  <Posts :posts="posts" />
</template>

<script>
import Posts from "@/components/PostsIterator.vue";
import axios from "axios";

export default {
  data() {
    return {
      posts: [],
    };
  },
  components: {
    Posts,
  },
  beforeMount() {
    axios
      .get("http://localhost:4000/post/tes/posts")
      .then((res) => {
        this.posts = res.data;
      })
      .catch((err) => {
        console.log(err);
      });
  },
};
</script>

<style>
</style>