<template>
  <v-card id="container" max-width="600">
    <v-card-title> Register </v-card-title>
    <v-card-text>
      <v-text-field label="Name" v-model="name"></v-text-field>
      <v-text-field label="Last Name" v-model="last_name"></v-text-field>
      <v-text-field label="Username" v-model="username"></v-text-field>
      <v-text-field
        label="Password"
        type="password"
        v-model="password"
      ></v-text-field>
      <v-text-field label="Age" v-model="age" type="number"></v-text-field>
    </v-card-text>
    <v-card-actions>
      <v-row>
        <v-col></v-col>
        <v-col><v-btn @click="login"> Submit </v-btn></v-col>
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
      name: "",
      last_name: "",
      username: "",
      password: "",
      age: 0,
    };
  },
  methods: {
    login() {
      axios
        .post("http://localhost:4000/user", {
          name: this.name,
          last_name: this.last_name,
          username: this.username,
          password: this.password,
          age: this.age,
        })
        .then(() => {
          alert("User created!");
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