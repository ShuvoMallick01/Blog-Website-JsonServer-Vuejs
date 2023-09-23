<template>
  <section class="xl:w-2/6 lg:w-2/5 w-2/3 mx-auto py-16">
    <h3 class="text-center font-bold text-xl text-gray-600 mb-10">
      Sign in to your account
    </h3>

    <!-- <p>{{ user }}</p> -->

    <form @submit.prevent="handleForm()">
      <div class="mb-6">
        <label for="email" class="block mb-2 text-sm font-medium text-gray-900"
          >Your email</label
        >
        <input
          v-model="email"
          type="email"
          id="email"
          class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5 dark:border-gray-600 dark:placeholder-gray-400"
          placeholder="name@flowbite.com"
          required
        />
      </div>

      <div class="mb-6">
        <label
          for="password"
          class="block mb-2 text-sm font-medium text-gray-900"
          >Your Password</label
        >
        <input
          v-model="password"
          type="password"
          id="password"
          class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5 dark:border-gray-600 dark:placeholder-gray-400"
          placeholder="name@flowbite.com"
          required
        />
      </div>

      <button
        type="submit"
        class="text-white bg-gray-700 hover:bg-gray-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full px-4 py-2.5 text-center"
      >
        Submit
      </button>
    </form>
  </section>
</template>

<!-- FUUNCTIONALITY -->
<script setup>
import { ref } from "vue";
import { storeToRefs } from "pinia";
import { useAuthStore } from "../stores/AuthStore";
import { useToast } from "vue-toastification";
import { useRouter } from "vue-router";

const toast = useToast();
const store = useAuthStore();
const { userLogin } = store;
// const { error } = storeToRefs(store);
const router = useRouter();

// State
let email = ref("");
let password = ref("");

const handleForm = async () => {
  // console.log(email.value, password.value);

  try {
    await userLogin({ email: email.value, password: password.value });
    toast.success("Login Successfully");
    return router.replace("/");
  } catch (error) {
    console.log(error);
  }

  email.value = "";
  password.value = "";

  // if (error) {
  //   toast(error);
  //   error = null;
  // } else {

  // }
};
</script>
