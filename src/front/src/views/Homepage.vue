<template>
  <v-app>
    <v-row class="header">
      <v-col></v-col>
      <v-col><Posts v-if="posts.length > 0" :postsRecieved="posts" /> </v-col>
      <v-col></v-col>
    </v-row>
    <div class="text-center">
      <BtnComponent icon="account" content="Edit profile" color="secondary" />
      <v-btn
        class="ma-2"
        color="white"
        width="10em"
        @click="createPostView = true"
      >
        <v-icon>mdi-pen</v-icon>
        Add post
      </v-btn>
      <v-btn class="ma-2" color="white" width="10em" @click="logout">
        <v-icon>mdi-logout</v-icon>
        Logout
      </v-btn>
      <v-dialog v-model="createPostView" width="700">
        <cardComponent title="Create post">
          <v-text-field label="Title" type="text" v-model="postTitle" />
          <v-text-field label="Content" type="textarea" v-model="postContent" />
          <v-row>
            <v-col></v-col>
            <v-col
              ><v-btn @click="createPostView = false"> Close </v-btn></v-col
            >
            <v-col><v-btn @click="createPost"> Create </v-btn></v-col>
            <v-col></v-col>
          </v-row>
        </cardComponent>
      </v-dialog>
    </div>
  </v-app>
</template>

<script>
import cardComponent from "@/components/CardComponent.vue";
import BtnComponent from "@/components/BtnComponent.vue";
import Posts from "@/components/PostsIterator.vue";
import axios from "axios";

export default {
  data() {
    return {
      posts: [],
      createPostView: false,
      postTitle: "",
      postContent: "",
    };
  },
  components: {
    Posts,
    BtnComponent,
    cardComponent,
  },
  beforeMount() {
    this.$store.state.userInSession === ""
      ? this.$router.push({ name: "LandingPage" })
      : axios
          .get(`http://localhost:4000/post/${this.$store.state.userInSession}`)
          .then((res) => {
            this.posts = res.data;
          })
          .catch((err) => {
            console.log(err);
            alert("There has been a server error :(");
          });
  },
  methods: {
    logout() {
      this.$store.commit("logout");
      this.$router.push({ name: "LandingPage" });
    },
    createPost() {
      axios
        .post(`http://localhost:4000/post/${this.$store.state.userInSession}`, {
          title: this.postTitle,
          content: this.postContent,
        })
        .then(() => {
          alert("Post created");
          this.$router.go();
        })
        .catch((err) => {
          console.log(err);
          alert("There has been a server error :(");
        });
    },
  },
};
</script>

<style>
.text-center {
  position: fixed;
}
</style>
