<template>
  <h1 class="text-2xl font-semibold text-slate-700 uppercase mt-5">
    User Profile || user Id: {{ $route.params.id }}
  </h1>

  <ul>
    <li>Profile for User {{ $route.params.id }}</li>
  </ul>
</template>

<script>
export default {};
</script>
