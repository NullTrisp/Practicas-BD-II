<template>
  <v-app>
    <v-row class="header">
      <v-col></v-col>
      <v-col
        ><cardComponent title="Edit profile">
          <v-card-text>
            <v-form ref="form">
              <v-text-field label="Name" v-model="user.name"></v-text-field>
              <v-text-field
                label="Last Name"
                v-model="user.last_name"
              ></v-text-field>
              <v-text-field
                label="Username"
                v-model="user.username"
              ></v-text-field>
              <v-text-field
                label="Password"
                type="password"
                v-model="user.password"
              ></v-text-field>
              <v-text-field
                label="Age"
                v-model="user.age"
                type="number"
              ></v-text-field>
              <v-text-field
                label="Street"
                v-model="user.address.street"
              ></v-text-field>
              <v-text-field
                label="City"
                v-model="user.address.city"
              ></v-text-field>
              <v-text-field
                label="State"
                v-model="user.address.state"
              ></v-text-field>
              <v-text-field
                label="Zip"
                v-model="user.address.zip"
                type="number"
              ></v-text-field>
            </v-form>
          </v-card-text>
          <v-card-actions>
            <v-row>
              <v-col></v-col>
              <v-col><v-btn @click="goToHomePage"> Go back </v-btn></v-col>
              <v-col><v-btn @click="updateProfile"> Update </v-btn></v-col>
              <v-col></v-col>
            </v-row>
          </v-card-actions> </cardComponent
      ></v-col>
      <v-col></v-col>
    </v-row>
  </v-app>
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
      user: {},
    };
  },
  beforeMount() {
    axios({
      method: "get",
      url: `http://localhost:4000/user/${this.$store.state.userInSession}`,
      headers: {},
    })
      .then((res) => {
        this.user = res.data;
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  },
  methods: {
    goToHomePage() {
      this.$router.push({ name: "Homepage" });
    },
    updateProfile() {
      axios({
        method: "put",
        url: "http://localhost:4000/user/test",
        headers: {
          "Content-Type": "application/json",
        },
        data: {
          name: this.user.name,
          last_name: this.user.last_name,
          username: this.user.username,
          password: this.user.password,
          age: this.user.age,
          isAdmin: this.user.isAdmin,
          address: {
            street: this.user.address.street,
            city: this.user.address.city,
            state: this.user.address.state,
            zip: this.user.address.zip,
          },
          posts: this.user.posts,
        },
      })
        .then(() => {
          alert("User Updated!");
          this.$router.go();
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
};
</script>
