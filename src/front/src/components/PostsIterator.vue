<template v-if="posts.length > 0" v-for="post in posts" :key="post.id">
  <v-card>
    <v-card-title> {{ post.title }} </v-card-title>
    <v-card-text> {{ post.title }}</v-card-text>
  </v-card>
</template>

<script>
export default {
  props: {
    posts: Array,
  },
  beforeMount() {
    console.log(this.posts);
  },
};
</script>

<style>
</style>