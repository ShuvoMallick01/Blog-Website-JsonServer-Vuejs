<template>
  <section class="xl:w-2/6 lg:w-2/5 w-2/3 mx-auto py-16">
    <h3 class="text-center font-bold text-xl text-gray-600 mb-10">
      Register with an Email
    </h3>

    <form @submit.prevent="handleSubmit()">
      <!-- Name -->
      <div class="mb-6">
        <label for="name" class="block mb-2 text-sm font-medium text-gray-900"
          >Your Full Name</label
        >
        <input
          v-model="name"
          type="text"
          id="name"
          name="name"
          class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5 dark:border-gray-600 dark:placeholder-gray-400"
          placeholder="name@flowbite.com"
          required
        />
      </div>

      <!-- Email -->
      <div class="mb-6">
        <label for="email" class="block mb-2 text-sm font-medium text-gray-900"
          >Your email</label
        >
        <input
          v-model="email"
          type="email"
          id="email"
          name="email"
          class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5 dark:border-gray-600 dark:placeholder-gray-400"
          placeholder="name@flowbite.com"
          required
        />
      </div>

      <!-- Password -->
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
          name="password"
          class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5 dark:border-gray-600 dark:placeholder-gray-400"
          placeholder="name@flowbite.com"
          required
        />
      </div>

      <!-- Confirm Password -->
      <div class="mb-6">
        <label
          for="confirmpassword"
          class="block mb-2 text-sm font-medium text-gray-900"
          >Your Confirm Password</label
        >
        <input
          v-model="confirmPassword"
          type="password"
          id="confirmpassword"
          name="confirmpassword"
          class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5 dark:border-gray-600 dark:placeholder-gray-400"
          placeholder="name@flowbite.com"
          required
        />
      </div>

      <button
        type="submit"
        class="text-white bg-gray-700 hover:bg-gray-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full px-4 py-2.5 text-center"
      >
        Register
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
const { userRegistration } = store;
const { error } = storeToRefs(store);
const router = useRouter();

// State
const name = ref("");
const email = ref("");
const password = ref("");
const confirmPassword = ref("");

// Methods
const handleSubmit = async () => {
  if (password.value !== confirmPassword.value) {
    // alert("Password Doesn't Match");
    toast.error("Password Doesn't Match");
    return;
  }

  await userRegistration({
    name: name.value,
    email: email.value,
    password: password.value,
  });

  if (error) {
    // console.log(error);
    toast.error(error);
  } else {
    toast.success("Registration Successfully!");
    router.replace("/login");
  }

  // console.log(this.name, this.email, this.password);

  name.value = "";
  email.value = "";
  password.value = "";
  confirmPassword.value = "";
};
</script>
