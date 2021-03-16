<template>
  <v-btn class="ma-2" :color="color" width="10em">
    <v-icon>mdi-{{ icon }}</v-icon>
    {{ content }}
  </v-btn>
</template>

<script>
export default {
  props: {
    icon: String,
    content: String,
    color: String,
    type: String,
  },
};
</script>

<style></style>
