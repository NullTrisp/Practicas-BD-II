<template>
  <v-card id="container" max-width="600">
    <v-card-title> Login </v-card-title>
    <v-card-text>
      <v-text-field label="Username" v-model="username"></v-text-field>
      <v-text-field
        label="Password"
        type="password"
        v-model="password"
      ></v-text-field>
    </v-card-text>
    <v-card-actions>
      <v-row>
        <v-col></v-col>
        <v-col><v-btn @click="login"> Submit </v-btn></v-col>
        <v-col></v-col>
      </v-row>
      <v-row>
        <v-col> <a href="/#/register">Register</a> </v-col>
        <v-col></v-col>
        <v-col></v-col>
      </v-row>
    </v-card-actions>
  </v-card>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      username: "",
      password: "",
    };
  },
  methods: {
    login() {
      axios
        .post("http://localhost:4000/user/login", {
          username: this.username,
          password: this.password,
        })
        .then(() => {
          this.$router.push({ name: "Homepage" });
        })
        .catch((err) => {
          console.error(err);
        });
    },
  },
};
</script>

<style>
.container {
  border-radius: 2em;
}
</style>