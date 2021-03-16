<template>
  <v-app>
    <br />
    <br />
    <br />
    <br />
    <v-row>
      <v-col></v-col>
      <v-col><Posts v-if="posts.length > 0" :postsRecieved="posts" /> </v-col>
      <v-col></v-col>
    </v-row>
    <div class="text-center">
      <BtnComponent icon="account" content="Edit profile" color="secondary" />
      <BtnComponent icon="pen" content="Add post" color="white" />
    </div>
  </v-app>
</template>

<script>
import BtnComponent from "@/components/BtnComponent.vue";
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
    BtnComponent,
  },
  beforeMount() {
    axios
      .get("http://localhost:4000/post/TestUsr/posts")
      .then((res) => {
        this.posts = res.data;
      })
      .catch(() => {
        alert("There has been a server error :(");
      });
  },
};
</script>

<style>
.text-center {
  position: fixed;
}
</style>
