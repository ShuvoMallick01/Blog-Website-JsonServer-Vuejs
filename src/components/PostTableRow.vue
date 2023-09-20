<template>
  <!-- <Loading v-if="loading"></Loading> -->

  <tr class="border-b border-gray-200" v-for="post in posts" :key="post.id">
    <th scope="row" class="px-6 py-4">
      <input type="checkbox" id="vehicle1" name="vehicle1" value="Bike" />
    </th>
    <th
      scope="row"
      class="px-6 py-4 font-medium text-gray-900 xl:whitespace-nowrap bg-gray-50"
    >
      {{ post.title }}
    </th>
    <td class="px-6 py-4 lg:w-80 xl:w-1/3 text-gray-900">
      {{ post.body.substring(0, 100) }}
      {{ post.body.length > 100 ? "..." : "" }}
    </td>
    <td class="px-6 py-4 bg-gray-50 text-gray-900 xl:w-52">
      {{ post.published ? "Published" : "Draft" }}
    </td>
    <td class="px-6 py-4 text-gray-900 xl:w-52 whitespace-nowrap">
      {{ formatDate(post.createdAt) }}
    </td>
    <td class="px-6 py-4 bg-gray-50 text-gray-900 whitespace-nowrap xl:w-52">
      <router-link
        :to="`/edit-post/${post.id}`"
        class="hover:text-red-600 me-2 hover:font-medium transition-all duration-300"
        >Edit</router-link
      >
      <a
        href="#"
        class="hover:text-red-600 me-2 hover:font-medium transition-all duration-300"
        @click="handleDeletePost(post.id)"
        >Delete</a
      >
    </td>
  </tr>
</template>

<script setup>
defineProps({
  posts: {
    type: Array,
    default: [],
    required: true,
  },

  formatDate: {
    type: Function,
    required: true,
  },

  handleDeletePost: {
    type: Function,
    required: true,
  },
});
</script>
