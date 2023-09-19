<template>
  <section class="xl:w-2/6 lg:w-2/5 w-2/3 mx-auto py-16">
    <h3 class="text-center font-bold text-2xl text-gray-600 mb-10">
      Edit Post
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
import { usePostsStore } from "../store/posts";
import { useToast } from "vue-toastification";
import Form from "../components/Form.vue";

const toast = useToast();

export default {
  data() {
    return {
      firstBtnTitle: "Update Post",
      secondBtnTitle: "",
      editId: null,
      inputFields: {
        title: "",
        body: "",
        tags: "",
        published: null,
      },
    };
  },

  beforeRouteEnter(to, from, next) {
    next(async (vm) => {
      let post = await vm.getPost(to.params.id);
      vm.inputFields.title = post.title;
      vm.inputFields.body = post.body;
      vm.inputFields.tags = String(post.tags);
      vm.inputFields.published = post.published;
      vm.editId = post.id;
      vm.secondBtnTitle = post.published ? "Save Draft" : "Publish";
    });
  },

  methods: {
    ...mapActions(usePostsStore, ["getPost", "editPost"]),

    async handleSubmit(event) {
      console.log(event.submitter.name);
      console.log(this.inputFields, this.editId);

      if (event.submitter.name === "updatepost") {
        try {
          await this.editPost(this.editId, {
            title: this.inputFields.title,
            body: this.inputFields.body,
            tags: this.inputFields.tags.split(",").map((item) => item.trim()),
            published: this.inputFields.published,
          });

          if (!this.error) {
            toast.success("Successfully Updated Post");
            this.$router.replace("/my-post");
          }
        } catch (error) {
          toast.error("An error occurred.");
        }
      } else {
        try {
          await this.editPost(this.editId, {
            title: this.inputFields.title,
            body: this.inputFields.body,
            tags: this.inputFields.tags.split(",").map((item) => item.trim()),
            published: !this.inputFields.published,
          });

          if (!this.error) {
            toast.success("Post Save Successfully");
            this.$router.replace("/my-post");
          }
        } catch (error) {
          toast.error("An error occurred.");
        }
      }
    },
  },

  components: {
    Form,
  },
};
</script>
