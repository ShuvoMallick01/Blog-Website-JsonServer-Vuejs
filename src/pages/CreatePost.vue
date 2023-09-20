<template>
  <section class="xl:w-2/6 lg:w-2/5 w-2/3 mx-auto py-16">
    <h3 class="text-center font-bold text-2xl text-gray-600 mb-10">
      Create a New Post
    </h3>

    <Form
      :inputFields="inputFields"
      :handleSubmit="handleSubmit"
      :firstBtnTitle="firstBtnTitle"
      :secondBtnTitle="secondBtnTitle"
    ></Form>
  </section>
</template>

<!-- FUUNCTIONALITY -->
<script>
import { mapActions, mapState } from "pinia";
import { usePostsStore } from "../stores/PostsStore";
import { useToast } from "vue-toastification";

import Form from "../components/Form.vue";

const toast = useToast();

export default {
  data() {
    return {
      firstBtnTitle: "Create Post",
      inputFields: {
        title: "",
        body: "",
        tags: "",
      },
      secondBtnTitle: "Save Draft",
    };
  },

  methods: {
    async handleSubmit(event) {
      console.log(event);
      console.log(event.submitter.name);
      if (event.submitter.name === "createpost") {
        try {
          await this.createPost({
            title: this.inputFields.title,
            body: this.inputFields.body,
            tags: this.inputFields.tags.split(",").map((item) => item.trim()),
            published: true,
          });

          if (!this.error) {
            toast.success("Post Created Successfully");

            this.$router.replace("/");
          }
        } catch (error) {
          toast.error("An error occurred.");
        }
      } else {
        try {
          await this.createPost({
            title: this.inputFields.title,
            body: this.inputFields.body,
            tags: this.inputFields.tags.split(",").map((item) => item.trim()),
            published: false,
          });

          if (!this.error) {
            toast.success("Post saved successfully");

            this.$router.replace("/");
          }
        } catch (error) {
          toast.error("An error occurred.");
        }
      }
    },

    ...mapActions(usePostsStore, ["createPost"]),
  },

  computed: {
    ...mapState(usePostsStore, ["error"]),
  },

  components: {
    Form,
  },
};
</script>
