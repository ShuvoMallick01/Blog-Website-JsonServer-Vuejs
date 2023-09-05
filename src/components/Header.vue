<template>
  <nav class="bg-white border-gray-200 dark:bg-gray-900">
    <div
      class="container max-w-screen-xl flex items-center justify-between py-4 px-10"
    >
      <a href="" class="flex items-center">
        <span
          class="self-center text-xl text-gray-400 font-semibold whitespace-nowrap"
          >VUE-BLOG</span
        > </a
      >``

      <div class="">
        <ul class="font-medium flex text-gray-400 gap-6 md:gap-8">
          <li>
            <router-link to="/" class="hover:text-slate-300 duration-300"
              >Home</router-link
            >
          </li>
          <li>
            <router-link to="/login" class="hover:text-slate-300 duration-300"
              >Login</router-link
            >
          </li>
          <li>
            <router-link
              to="/register"
              class="hover:text-slate-300 duration-300"
              >Register</router-link
            >
          </li>
          <li>
            <router-link to="/posts" class="hover:text-slate-300 duration-300"
              >My Post</router-link
            >
          </li>
          <li>
            <router-link
              to="/createpost"
              class="hover:text-slate-300 duration-300"
              >Create Post</router-link
            >
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<script>
export default {};
</script>
