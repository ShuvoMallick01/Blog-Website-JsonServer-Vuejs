<template>
  <nav class="bg-white border-gray-200 dark:bg-gray-900">
    <div
      class="container max-w-screen-xl flex items-center justify-between py-4 px-10"
    >
      <a href="" class="flex items-center">
        <span
          class="self-center text-2xl font-semibold whitespace-nowrap dark:text-white"
          >Router</span
        >
      </a>

      <div class="">
        <ul class="font-medium flex text-white gap-6 md:gap-12">
          <li>
            <router-link to="/" class="hover:text-slate-300 duration-300"
              >Home</router-link
            >
          </li>
          <li>
            <router-link to="/about" class="hover:text-slate-300 duration-300"
              >About</router-link
            >
          </li>
          <li>
            <router-link to="/contact" class="hover:text-slate-300 duration-300"
              >Contact</router-link
            >
          </li>
          <li>
            <router-link to="/user" class="hover:text-slate-300 duration-300"
              >User</router-link
            >
          </li>
          <li>
            <router-link to="/posts" class="hover:text-slate-300 duration-300"
              >Posts</router-link
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
