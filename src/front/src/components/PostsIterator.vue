<template>
  <div>
    <div v-if="!editView">
      <v-card class="cardIterator" v-for="(post, i) in posts" :key="i">
        <v-card-title> {{ post.title }} </v-card-title>
        <v-card-text> {{ post.content }}</v-card-text>
        <v-btn
          class="ma-2"
          color="blue"
          width="10em"
          @click="
            editView = true;
            postTitle = post.title;
            postContent = post.content;
            postHash = post.hash;
          "
        >
          <v-icon>mdi-pen</v-icon>
          Edit
        </v-btn>
        <v-btn
          class="ma-2"
          color="red"
          width="10em"
          @click="deletePost(post.hash)"
        >
          <v-icon>mdi-delete</v-icon>
          Delete
        </v-btn>
      </v-card>
    </div>
    <div>
      <cardComponent v-if="editView" title="Edit Post">
        <v-card-text>
          <v-text-field label="Title" v-model="postTitle"></v-text-field>
          <v-text-field label="Content" v-model="postContent"></v-text-field>
        </v-card-text>
        <v-card-actions>
          <v-btn
            class="ma-2"
            color="white"
            width="10em"
            @click="editView = false"
          >
            Cancel
          </v-btn>
          <v-btn class="ma-2" color="white" width="10em" @click="editPost">
            Update
          </v-btn>
        </v-card-actions>
      </cardComponent>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import cardComponent from "@/components/CardComponent.vue";
export default {
  components: {
    cardComponent,
  },
  props: {
    postsRecieved: Array,
  },
  data() {
    return {
      posts: this.$props.postsRecieved,
      post: "",
      editView: false,
      postTitle: "",
      postContent: "",
      postHash: "",
    };
  },
  methods: {
    editPost() {
      axios({
        method: "put",
        url: `http://localhost:4000/post/${this.$store.state.userInSession}/${this.postHash}`,
        headers: {
          "Content-Type": "application/json",
        },
        data: {
          title: this.postTitle,
          content: this.postContent,
        },
      })
        .then(() => {
          alert("Post updated!");
          this.$router.go();
        })
        .catch((err) => {
          alert("There was a server error! :(");
          console.log(err);
        });
    },

    deletePost(hash) {
      axios
        .delete(
          `http://localhost:4000/post/${this.$store.state.userInSession}/${hash}`
        )
        .then(() => {
          alert("Post Deleted succesfully");
          this.$router.go();
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
};
</script>

<style>
.cardIterator {
  margin-bottom: 2em;
}
</style>
