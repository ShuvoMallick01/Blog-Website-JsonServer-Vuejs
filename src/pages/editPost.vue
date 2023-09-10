<template>
  <section class="xl:w-2/6 lg:w-2/5 w-2/3 mx-auto py-16">
    <h3 class="text-center font-bold text-2xl text-gray-600 mb-10">
      Edit Post
    </h3>

    <Form
      :inputFields="inputFields"
      :handleSubmit="handleSubmit"
      :title="title"
    ></Form>
  </section>
</template>

<!-- FUUNCTIONALITY -->
<script>
import { mapActions, mapState } from "pinia";
import { usePostsStore } from "../store/posts";
import { useToast } from "vue-toastification";

import Form from "../components/Form.vue";
import { handleError } from "vue";

const toast = useToast();

export default {
  data() {
    return {
      title: "Update Post",
      editId: null,
      inputFields: {
        title: "",
        body: "",
        tags: "",
      },
    };
  },

  beforeRouteEnter(to, from, next) {
    next(async (vm) => {
      let post = await vm.getPost(to.params.id);
      vm.inputFields.title = post.title;
      vm.inputFields.body = post.body;
      vm.inputFields.tags = String(post.tags);
      vm.editId = post.id;
    });
  },

  methods: {
    ...mapActions(usePostsStore, ["getPost", "editPost"]),

    async handleSubmit() {
      console.log(this.inputFields, this.editId);

      // await this.editPost(this.editId, {
      //   title: this.inputFields.title,
      //   body: this.inputFields.body,
      //   tags: this.inputFields.tags.split(",").map((item) => item.trim()),
      // });
      // console.log("Inside Try");

      try {
        await this.editPost(this.editId, {
          title: this.inputFields.title,
          body: this.inputFields.body,
          tags: this.inputFields.tags.split(",").map((item) => item.trim()),
        });

        if (!this.error) {
          toast.success("Successfully Updated Post");
          this.$router.replace("/my-post");
        }
      } catch (error) {
        toast.error("An error occurred.");
      }
    },
  },

  components: {
    Form,
  },
};
</script>
