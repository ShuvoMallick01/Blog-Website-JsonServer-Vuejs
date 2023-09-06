<template>
  <section class="xl:w-2/6 lg:w-2/5 w-2/3 mx-auto py-16">
    <h3 class="text-center font-bold text-xl text-gray-600 mb-10">
      Register with an Email
    </h3>

    <form>
      <div class="mb-6">
        <label for="name" class="block mb-2 text-sm font-medium text-gray-900"
          >Your Full Name</label
        >
        <input
          type="text"
          id="name"
          class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5 dark:border-gray-600 dark:placeholder-gray-400"
          placeholder="name@flowbite.com"
          required
        />
      </div>

      <div class="mb-6">
        <label for="email" class="block mb-2 text-sm font-medium text-gray-900"
          >Your email</label
        >
        <input
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
          type="password"
          id="password"
          class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5 dark:border-gray-600 dark:placeholder-gray-400"
          placeholder="name@flowbite.com"
          required
        />
      </div>

      <div class="mb-6">
        <label
          for="confirmpassword"
          class="block mb-2 text-sm font-medium text-gray-900"
          >Your Confirm Password</label
        >
        <input
          type="password"
          id="confirmpassword"
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
<script>
export default {};
</script>
