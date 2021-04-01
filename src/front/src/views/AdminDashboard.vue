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
        <div v-for="user in users" :key="user.username" style="width:20em; height: 8em">
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
        <CardComponent title="Admin options" style="width:35em">
          <v-card-text>
            <v-row>
              <v-col
                ><v-text-field
                  v-model="age"
                  label="Get Amount of posts per age"
                  type="number"
                ></v-text-field
              ></v-col>
              <v-col></v-col>
              <v-col> <v-btn @click="getByAge">Go</v-btn> </v-col>
            </v-row>

            <h3>Get amount of posts per age range:</h3>
            <v-row>
              <v-col
                ><v-text-field label="From" type="number" v-model="ageInit">
                </v-text-field
              ></v-col>
              <v-col
                ><v-text-field label="To" type="number" v-model="ageEnd">
                </v-text-field
              ></v-col>
              <v-col></v-col>
              <v-col><v-btn @click="getByAgeRange">Go</v-btn></v-col>
            </v-row>

            <h3>Get amount of posts per date range:</h3>
            <v-row>
              <v-col
                ><v-text-field label="From" type="date" v-model="dateInit">
                </v-text-field
              ></v-col>
              <v-col></v-col>
              <v-col
                ><v-text-field label="To" type="date" v-model="dateEnd">
                </v-text-field
              ></v-col>
              <v-col></v-col>
              <v-col><v-btn @click="getByDateRange">Go</v-btn></v-col>
            </v-row>
          </v-card-text>
        </CardComponent>
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
      age: 0,
      ageInit: 0,
      ageEnd: 0,
      dateInit: "",
      dateEnd: "",
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
    getByAge() {
      axios({
        method: "get",
        url: `http://localhost:4000/analytics/${this.age}`,
        headers: {},
      })
        .then((res) => {
          alert(`Result is: ${res.data[0].posts}`);
        })
        .catch((err) => {
          alert(err);
        });
    },
    getByAgeRange() {
      axios({
        method: "get",
        url: `http://localhost:4000/analytics/age/${this.ageInit}/${this.ageEnd}`,
        headers: {},
      })
        .then((res) => {
          alert(`Result is: ${res.data[0]?.posts || 0}`);
        })
        .catch((err) => {
          alert(err);
        });
    },
    getByDateRange() {
      axios({
        method: "get",
        url: `http://localhost:4000/analytics/${this.dateInit}/${this.dateEnd}`,
        headers: {},
      })
        .then((res) => {
          alert(`Result is: ${res.data[0].posts}`);
        })
        .catch((err) => {
          alert(err);
        });
    },
  },
};
</script>

<style></style>
