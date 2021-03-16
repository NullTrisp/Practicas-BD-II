<template>
  <v-card id="container" max-width="600">
    <v-card-title>{{ title }}</v-card-title>
    <slot></slot>
  </v-card>
</template>

<script>
export default {
  props: {
    title: String,
  },
};
</script>

<style>
.container {
  border-radius: 2em;
}
</style>