<template>
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

      <v-list-item @click="goToProfile">
        <v-list-item-icon>
          <v-icon>mdi-pen</v-icon>
        </v-list-item-icon>
        <v-list-item-content>
          <v-list-item-title>Add post</v-list-item-title>
        </v-list-item-content>
      </v-list-item>

      <v-list-item @click="goToProfile">
        <v-list-item-icon>
          <v-icon>mdi-account</v-icon>
        </v-list-item-icon>
        <v-list-item-content>
          <v-list-item-title>Edit profile</v-list-item-title>
        </v-list-item-content>
      </v-list-item>

      <v-list-item @click="goToProfile">
        <v-list-item-icon>
          <v-icon>mdi-account</v-icon>
        </v-list-item-icon>
        <v-list-item-content>
          <v-list-item-title>Edit profile</v-list-item-title>
        </v-list-item-content>
      </v-list-item>

    </v-list>
  </v-navigation-drawer>
</template>

<script>
export default {
  data() {
    return {
      user: this.$store.state.userInSession,
    };
  },
  methods: {
    goToProfile() {
      console.log("test");
    },
  },
};
</script>
