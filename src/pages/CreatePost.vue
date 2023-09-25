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
<script setup>
import { ref, reactive } from "vue";
import { storeToRefs } from "pinia";
import { usePostsStore } from "../stores/PostsStore";
import { useToast } from "vue-toastification";
import Form from "../components/Form.vue";
import { useRouter } from "vue-router";

const toast = useToast();
const store = usePostsStore();
const router = useRouter();
const { error } = storeToRefs(store);

// State
const firstBtnTitle = ref("Create Post");
const inputFields = reactive({
  title: "",
  body: "",
  tags: "",
});
const secondBtnTitle = ref("Save Draft");

// Methods
const handleSubmit = async (event) => {
  console.log(event.submitter.name);

  const postData = {
    title: inputFields.title,
    body: inputFields.body,
    tags: inputFields.tags.split(",").map((item) => item.trim()),
    published: true,
  };

  if (event.submitter.name === "createpost") {
    try {
      await store.createPost(postData);
      toast.success("Post Created Successfully");
      router.replace("/");
    } catch (error) {
      toast.error("Something Wents Wrong");
    }
  } else if (event.submitter.name === "savedraft") {
    try {
      postData.published = false;
      await store.createPost(postData);
      toast.success("Post saved successfully");
      router.replace("/");
    } catch (error) {
      toast.error("Something Wents Wrong");
    }
  }
};
</script>
