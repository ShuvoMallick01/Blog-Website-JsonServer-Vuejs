<template>
  <form @submit.prevent="handleSubmit">
    <!-- Name -->
    <div class="mb-6">
      <label for="name" class="block mb-2 text-sm font-medium text-gray-900"
        >Title</label
      >
      <input
        v-model="inputFields.title"
        type="text"
        id="name"
        name="name"
        class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5 dark:border-gray-600 dark:placeholder-gray-400"
        placeholder="name@flowbite.com"
        required
      />
    </div>

    <!-- Your Email -->
    <div class="mb-6">
      <label for="email" class="block mb-2 text-sm font-medium text-gray-900"
        >Description</label
      >
      <textarea
        v-model="inputFields.body"
        id="description"
        name="description"
        rows="4"
        cols="50"
        class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5 dark:border-gray-600 dark:placeholder-gray-400"
        placeholder="description"
        required
      />
    </div>

    <div class="mb-6">
      <label for="name" class="block mb-2 text-sm font-medium text-gray-900"
        >Tags</label
      >
      <input
        v-model="inputFields.tags"
        type="text"
        id="tags"
        name="tags"
        class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5 dark:border-gray-600 dark:placeholder-gray-400"
        placeholder="tags"
        required
      />
    </div>

    <div class="flex gap-6">
      <button
        type="submit"
        :name="firstBtnTitle.toLowerCase().split(' ').join('')"
        class="text-white bg-gray-700 hover:bg-gray-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full px-4 py-2.5 text-center"
      >
        {{ firstBtnTitle }}
      </button>

      <button
        type="submit"
        :name="secondBtnTitle.toLowerCase().split(' ').join('')"
        class="text-white bg-gray-700 hover:bg-gray-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full px-4 py-2.5 text-center"
      >
        {{ secondBtnTitle }}
      </button>
    </div>
  </form>
</template>

<!-- FUUNCTIONALITY -->
<script>
export default {
  data() {
    return {};
  },

  props: {
    firstBtnTitle: {
      type: String,
      default: "Button",
      required: true,
    },
    secondBtnTitle: {
      type: String,
      default: "Button",
      required: true,
    },
    inputFields: {
      type: Object,
      default: {},
      required: true,
    },

    handleSubmit: {
      type: Function,
      required: true,
    },
  },
};
</script>
