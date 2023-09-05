<template>
  <h1 class="text-2xl font-semibold text-slate-700 uppercase mt-5">
    User Details || user Id: {{ $route.params.id }}
  </h1>

  <ul>
    <li class="mt-5">
      <router-link :to="$route.params.id + '/profile'"
        >User Profile: {{ $route.params.id }}</router-link
      >
    </li>

    <router-view />
  </ul>
</template>

<script>
export default {};
</script>
