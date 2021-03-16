<template>
  <v-app>
    <v-row>
      <v-col></v-col>
      <v-col>
        <cardLoginComponent
          v-on:changeView="registerView(false)"
          v-if="activeLogin"
        />
        <cardRegisterComponent
          v-on:changeView="registerView(true)"
          v-if="!activeLogin"
        />
      </v-col>
      <v-col></v-col>
    </v-row>
  </v-app>
</template>

<script>
import cardLoginComponent from "@/components/LoginComponent.vue";
import cardRegisterComponent from "@/components/RegisterComponent.vue";
export default {
  components: {
    cardLoginComponent,
    cardRegisterComponent,
  },
  data() {
    return {
      activeLogin: true,
    };
  },
  methods: {
    registerView(arg) {
      this.activeLogin = arg;
    },
  },
};
</script>

<style></style>
