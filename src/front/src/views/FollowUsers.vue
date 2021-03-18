<template>
  <v-app>
    <v-row class="header">
      <v-col></v-col>
      <v-col>
        <v-btn @click="goBack">
          Go back
        </v-btn>
      </v-col>
      <v-col
        ><v-card
          v-for="user in users"
          :key="user.username"
          class="cardIterator"
          width="20em"
        >
          <v-card-title>
            <v-row>
              <v-col>{{ user.username }}</v-col>
              <v-col
                ><v-card-actions>
                  <v-btn
                    class="ma-2"
                    color="white"
                    width="1em"
                    @click="follow(user.username)"
                  >
                    <v-icon>mdi-account-multiple-plus</v-icon>
                  </v-btn>
                </v-card-actions></v-col
              >
            </v-row>
          </v-card-title>
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
    };
  },
  beforeMount() {
    this.getUsers();
  },
  methods: {
    getUsers() {
      axios({
        method: "get",
        url: `http://localhost:4000/friend/find/${this.$store.state.userInSession}`,
        headers: {},
      })
        .then((res) => {
          this.users = res.data;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    follow(user) {
      axios({
        method: "post",
        url: `http://localhost:4000/friend/${this.$store.state.userInSession}/add/${user}`,
        headers: {},
      })
        .then((res) => {
          alert("User added!");
          this.getUsers();
          console.log(res);
        })
        .catch((err) => {
          console.log(err);
        });
    },
    goBack() {
      this.$router.push({ name: "Homepage" });
    },
  },
};
</script>

<style></style>
