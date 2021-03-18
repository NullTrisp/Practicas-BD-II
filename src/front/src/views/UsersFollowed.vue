<template>
  <v-app>
    <v-row class="header">
      <v-col></v-col>
      <v-col>
        <v-btn @click="goBack">
          Go back
        </v-btn>
      </v-col>
      <v-col v-if="!postsView"
        ><v-card
          v-for="user in users"
          :key="user.username"
          class="cardIterator"
          width="25em"
        >
          <v-card-title>
            <v-row>
              <v-col></v-col>
              <v-col>{{ user.username }}</v-col>
              <v-col></v-col>
            </v-row>
            <v-row>
              <v-card-actions>
                <v-col
                  ><v-btn
                    class="ma-2"
                    color="white"
                    width="10em"
                    @click="seePosts(user.username)"
                  >
                    See Posts
                  </v-btn></v-col
                >
                <v-col
                  ><v-btn
                    class="ma-2"
                    color="white"
                    width="10em"
                    @click="unfollow(user.username)"
                  >
                    Unfollow
                  </v-btn></v-col
                >
              </v-card-actions></v-row
            >
          </v-card-title>
        </v-card>
      </v-col>
      <v-col v-if="postsView">
        <v-card class="cardIterator" v-for="(post, i) in posts" :key="i">
          <v-card-title> {{ post.title }} </v-card-title>
          <v-card-text> {{ post.content }}</v-card-text>
        </v-card>
      </v-col>
      <v-col></v-col>
      <v-col></v-col>
    </v-row>
  </v-app>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      users: [],
      postsView: false,
      posts: [],
    };
  },
  beforeMount() {
    axios({
      method: "get",
      url: `http://localhost:4000/friend/${this.$store.state.userInSession}`,
      headers: {},
    })
      .then((res) => {
        this.users = res.data;
      })
      .catch((err) => {
        console.log(err);
      });
  },
  methods: {
    goBack() {
      this.$router.push({ name: "Homepage" });
    },
    seePosts(user) {
      axios({
        method: "get",
        url: `http://localhost:4000/post/${user}`,
        headers: {},
      })
        .then((res) => {
          this.posts = res.data;
          this.postsView = !this.postsView;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    unfollow(user) {
      axios({
        method: "delete",
        url: `http://localhost:4000/friend/${this.$store.state.userInSession}/delete/${user}`,
        headers: {},
      })
        .then(() => {
          alert("User Unfollowed!");
          this.$router.go();
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
};
</script>

<style></style>
