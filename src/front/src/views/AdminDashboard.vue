<template>
  <v-app>
    <v-row class="header">
      <v-col></v-col>
      <v-col>
        <v-btn @click="goBack" v-if="!seeUsers && !seeAnalytics">
          Go back
        </v-btn>
        <v-btn @click="seeUsers = !seeUsers" v-if="seeUsers && !seeAnalytics">
          Go back
        </v-btn>
        <v-btn
          @click="seeAnalytics = !seeAnalytics"
          v-if="!seeUsers && seeAnalytics"
        >
          Go back
        </v-btn>
      </v-col>
      <v-col v-if="!seeUsers && !seeAnalytics">
        <CardComponent title="Admin panel">
          <v-card-actions>
            <v-row>
              <v-col></v-col>
              <v-col
                ><v-btn
                  @click="
                    seeUsers = !seeUsers;
                    getUsers();
                  "
                >
                  See users
                </v-btn></v-col
              >
              <v-col></v-col>
              <v-col
                ><v-btn @click="seeAnalytics = !seeAnalytics">
                  See Analytics
                </v-btn></v-col
              >
              <v-col></v-col>
            </v-row>
          </v-card-actions>
        </CardComponent>
      </v-col>
      <v-col v-if="seeUsers">
        <div v-for="user in users" :key="user.username">
          <v-card>
            <v-row>
              <v-col
                ><v-card-title> {{ user.username }}</v-card-title>
              </v-col>
              <v-col
                ><v-btn @click="deleteUser(user.username)">
                  Delete
                </v-btn></v-col
              >
            </v-row>
          </v-card>
        </div>
      </v-col>
      <v-col v-if="seeAnalytics">
        <v-data-table :headers="headers" hide-default-footer :items="items">
        </v-data-table>
      </v-col>
      <v-col></v-col>
      <v-col></v-col>
    </v-row>
  </v-app>
</template>

<script>
import CardComponent from "@/components/CardComponent.vue";
import axios from "axios";
export default {
  components: {
    CardComponent,
  },
  data() {
    return {
      seeUsers: false,
      seeAnalytics: false,
      users: [],
      headers: [
        {
          text: "Name",
          align: "start",
          sortable: false,
          value: "name",
        },
        { text: "Value", value: "value", sortable: false },
      ],
      items: [],
    };
  },
  methods: {
    getUsers() {
      axios({
        method: "get",
        url: "http://localhost:4000/user",
        headers: {},
      })
        .then((res) => {
          this.users = res.data;
        })
        .catch(() => {
          alert("There was a server error! :(");
        });
    },
    deleteUser(username) {
      axios({
        method: "delete",
        url: `http://localhost:4000/user/${username}`,
        headers: {},
      })
        .then(() => {
          alert("User deleted!");
          this.getUsers();
        })
        .catch(() => {});
    },
    goBack() {
      this.$router.push({ name: "Homepage" });
    },
  },
};
</script>

<style></style>
