<template>
  <v-app>
    <NavBar />
    <v-row class="header">
      <v-col></v-col>
      <v-col>
        <Posts
          v-if="posts.length > 0 && !createPostView"
          :postsRecieved="posts"
        />
        <cardComponent v-if="createPostView" title="Create Post">
          <v-card-text>
            <v-text-field label="Title" v-model="postTitle"></v-text-field>
            <v-text-field label="Content" v-model="postContent"></v-text-field>
          </v-card-text>
          <v-card-actions>
            <v-btn
              class="ma-2"
              color="white"
              width="10em"
              @click="createPostView = false"
            >
              Cancel
            </v-btn>
            <v-btn class="ma-2" color="white" width="10em" @click="createPost">
              Create
            </v-btn>
          </v-card-actions>
        </cardComponent>
      </v-col>
      <v-col></v-col>
    </v-row>
    <div class="text-center">
      <v-btn class="ma-2" color="white" width="10em" @click="goToProfile">
        <v-icon>mdi-account</v-icon>
        Edit Profile
      </v-btn>
      <v-btn
        class="ma-2"
        color="white"
        width="10em"
        @click="createPostView = true"
        v-if="!createPostView"
      >
        <v-icon>mdi-pen</v-icon>
        Add post
      </v-btn>
      <v-btn class="ma-2" color="white" width="10em" @click="goToFollow">
        <v-icon>mdi-account-group </v-icon>
        Follow Users
      </v-btn>
      <v-btn
        class="ma-2"
        color="white"
        width="10em"
        v-if="this.$store.state.isAdmin"
      >
        <v-icon>mdi-desktop-mac-dashboard </v-icon>
        Admin panel
      </v-btn>
      <v-btn class="ma-2" color="white" width="10em" @click="logout">
        <v-icon>mdi-logout</v-icon>
        Logout
      </v-btn>
    </div>
  </v-app>
</template>

<script>
import cardComponent from "@/components/CardComponent.vue";
import NavBar from "@/components/NavBar.vue";
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
    cardComponent,
    NavBar,
  },
  beforeMount() {
    this.$store.state.userInSession === ""
      ? this.$router.push({ name: "LandingPage" })
      : this.getPosts();
  },
  methods: {
    getPosts() {
      axios
        .get(`http://localhost:4000/post/${this.$store.state.userInSession}`)
        .then((res) => {
          this.posts = res.data;
        })
        .catch((err) => {
          console.log(err);
          alert("There has been a server error :(");
        });
    },
    logout() {
      this.$store.commit("logout");
      this.$router.push({ name: "LandingPage" });
    },
    createPost() {
      axios({
        method: "post",
        url: `http://localhost:4000/post/${this.$store.state.userInSession}`,
        headers: {
          "Content-Type": "application/json",
        },
        data: { title: this.postTitle, content: this.postContent },
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
    goToProfile() {
      this.$router.push({ name: "UpdateProfile" });
    },
    goToFollow() {
      this.$router.push({ name: "FollowUsers" });
    },
  },
};
</script>

<style>
.text-center {
  position: fixed;
}
</style>
