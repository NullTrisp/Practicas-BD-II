<template>
  <cardComponent title="Login">
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
        <v-col> <a @click="registerView">Register</a> </v-col>
        <v-col></v-col>
        <v-col></v-col>
      </v-row>
    </v-card-actions>
  </cardComponent>
</template>

<script>
import cardComponent from "@/components/CardComponent.vue";
import axios from "axios";
export default {
  components: {
    cardComponent,
  },
  data() {
    return {
      username: "",
      password: "",
    };
  },
  methods: {
    login() {
      axios({
        method: "post",
        url: "http://localhost:4000/user/login",
        headers: {
          "Content-Type": "application/json",
        },
        data: {
          username: this.username,
          password: this.password,
        },
      })
        .then((res) => {
          this.$store.commit("login", {
            username: res.data.username,
            isAdmin: res.data.isAdmin,
          });
          this.$router.push({ name: "Homepage" });
        })
        .catch((err) => {
          err.response.status === 404
            ? alert("Error in credentials!")
            : alert("Server error! :(");
        });
    },
    registerView() {
      this.$emit("changeView");
    },
  },
};
</script>

<style>
.container {
  border-radius: 2em;
}
</style>
