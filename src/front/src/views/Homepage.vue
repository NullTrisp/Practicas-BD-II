<template>
  <v-app>
    <v-row class="header">
      <v-navigation-drawer absolute permanent right>
        <template v-slot:prepend>
          <v-list-item two-line>
            <v-list-item-content>
              <v-list-item-title>{{ user }}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </template>
        <v-divider></v-divider>
        <v-list dense>
          <v-list-item @click="goToProfile">
            <v-list-item-icon>
              <v-icon>mdi-account</v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title>Edit profile</v-list-item-title>
            </v-list-item-content>
          </v-list-item>

          <v-list-item @click="createPostView = true">
            <v-list-item-icon>
              <v-icon>mdi-pen</v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title>Add post</v-list-item-title>
            </v-list-item-content>
          </v-list-item>

          <v-list-item @click="goToFollow">
            <v-list-item-icon>
              <v-icon>mdi-account-multiple-plus</v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title>Follow Users</v-list-item-title>
            </v-list-item-content>
          </v-list-item>

          <v-list-item @click="goToFollowed">
            <v-list-item-icon>
              <v-icon>mdi-account-group</v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title>Users Followed</v-list-item-title>
            </v-list-item-content>
          </v-list-item>

          <v-list-item @click="goToAdmin" v-if="this.$store.state.isAdmin">
            <v-list-item-icon>
              <v-icon>mdi-desktop-mac-dashboard</v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title>Admin panel</v-list-item-title>
            </v-list-item-content>
          </v-list-item>

          <v-list-item @click="logout">
            <v-list-item-icon>
              <v-icon>mdi-logout</v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title>Logout</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list>
      </v-navigation-drawer>
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
  </v-app>
</template>

<script>
import cardComponent from "@/components/CardComponent.vue";
import Posts from "@/components/PostsIterator.vue";
import axios from "axios";

export default {
  data() {
    return {
      posts: [],
      createPostView: false,
      postTitle: "",
      postContent: "",
      user: this.$store.state.userInSession,
    };
  },
  components: {
    Posts,
    cardComponent,
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
          err.response.status === 404
            ? alert("User has no posts")
            : alert("There has been a server error :(");
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
    goToFollowed() {
      this.$router.push({ name: "UsersFollowed" });
    },
    goToAdmin() {
      this.$router.push({ name: "AdminDashboard" });
    },
  },
};
</script>

<style>
.text-center {
  position: fixed;
}
</style>
