<template>
  <cardComponent title="Register">
    <v-card-text>
      <v-form ref="form">
        <v-text-field label="Name" v-model="name"></v-text-field>
        <v-text-field label="Last Name" v-model="last_name"></v-text-field>
        <v-text-field label="Username" v-model="username"></v-text-field>
        <v-text-field
          label="Password"
          type="password"
          v-model="password"
        ></v-text-field>
        <v-text-field label="Age" v-model="age" type="number"></v-text-field>
      </v-form>
    </v-card-text>
    <v-card-actions>
      <v-row>
        <v-col></v-col>
        <v-col><v-btn @click="goBack"> Go back </v-btn></v-col>
        <v-col><v-btn @click="login"> Submit </v-btn></v-col>
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
          isAdmin: false,
        })
        .then(() => {
          this.$refs.form.reset();
          alert("User created!");
        })
        .catch((err) => {
          console.error(err);
        });
    },
    goBack() {
      this.$emit("changeView");
    },
  },
};
</script>

<style>
.container {
  border-radius: 2em;
}
/* Chrome, Safari, Edge, Opera */
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

/* Firefox */
input[type="number"] {
  -moz-appearance: textfield;
}
</style>
