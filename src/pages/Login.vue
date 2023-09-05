<template>
  <h1 class="text-2xl font-semibold text-slate-700 uppercase mt-5">
    Page Name: <span class="underline">User Page</span>
  </h1>

  <ul>
    <li v-for="id in 5">
      <router-link :to="'user/' + id">User Id: {{ id }}</router-link>
    </li>
  </ul>
</template>

<script>
export default {};
</script>
