<template>
  <div class="relative overflow-x-auto shadow-md sm:rounded-lg">
    <form class="mb-5 lg:w-1/2 mx-auto">
      <label
        for="default-search"
        class="mb-2 text-sm font-medium text-gray-900 sr-only"
        >Search</label
      >
      <div class="relative">
        <div
          class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none"
        >
          <svg
            class="w-4 h-4 text-gray-500"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 20 20"
          >
            <path
              stroke="currentColor"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
            />
          </svg>
        </div>
        <input
          v-model="searchInput"
          type="search"
          id="default-search"
          class="block w-full p-4 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:border-gray-400 focus:ring-0 focus:outline-none"
          placeholder="Search Mockups, Logos..."
          required
        />
      </div>
    </form>

    <!-- Table -->
    <table
      class="w-full text-sm text-left text-gray-500 dark:text-gray-400 overflow-x-auto"
    >
      <thead class="text-xs text-gray-700 uppercase dark:text-gray-400">
        <tr>
          <th scope="col" class="px-6 py-3 bg-gray-200 text-gray-800 font-bold">
            <input type="checkbox" id="vehicle1" name="vehicle1" value="Bike" />
          </th>
          <th scope="col" class="px-6 py-3 bg-gray-200 text-gray-800 font-bold">
            TITLE
          </th>
          <th scope="col" class="px-6 py-3 bg-gray-200 text-gray-800 font-bold">
            BODY
          </th>
          <th scope="col" class="px-6 py-3 bg-gray-200 text-gray-800 font-bold">
            STATUS
          </th>
          <th
            scope="col"
            class="px-6 py-3 bg-gray-200 text-gray-800 font-bold whitespace-nowrap"
          >
            CREATED AT
          </th>
          <th scope="col" class="px-6 py-3 bg-gray-200 text-gray-800 font-bold">
            ACTION
          </th>
        </tr>
      </thead>
      <!-- <Loading v-if="loading"></Loading> -->

      <tbody else>
        <PostTableRow
          v-if="filterPostList.length > 0"
          :posts="filterPostList"
          :formatDate="formatDate"
          :handleDeletePost="handleDeletePost"
          :loading="loading"
        ></PostTableRow>

        <tr
          v-else
          class="mx-auto text-center py-10 text-slate-400 font-light text-lg"
        >
          <td class="py-10 text-slate-400 font-light text-lg" colspan="6">
            Not found any result
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup>
import { onMounted, ref, watch } from "vue";
import { storeToRefs } from "pinia";
import { usePostsStore } from "../stores/PostsStore";
import { format } from "date-fns";
import PostTableRow from "../components/PostTableRow.vue";
// import Loading from "../components/Loading.vue";
import { useToast } from "vue-toastification";
import { useRouter } from "vue-router";

const toast = useToast();
const store = usePostsStore();
const router = useRouter();
const { error } = storeToRefs(store);
const { deletePost, filterPost, getPostsByUser } = store;

// State
const posts = ref([]);
const searchInput = ref(null);
const loading = ref(false);
const filterPostList = ref([]);

const handleDeletePost = async (id) => {
  try {
    await deletePost(id);

    if (!error.value) {
      fetchData();
      toast.success("Successfully Post Delete!");
      router.push("/my-post");
    }
  } catch (error) {
    if (this.error) {
      toast.error("Someting Wents Wrong");
    }
  }
};

const formatDate = (date) => {
  return format(new Date(date), "dd MMM yyyy");
};

const handleFilterPost = async () => {
  // console.log(filterPostList);
  try {
    loading.value = true;
    let data = await filterPost(searchInput.value);
    filterPostList.value = [...data];
    console.log(filterPostList.value);
    return;
  } catch (error) {
    console.log(error);
  } finally {
    loading.value = false;
  }
};

watch(searchInput, (newSearch, oldSearch) => {
  searchInput.value = newSearch;
  handleFilterPost();
});

const fetchData = async () => {
  let data = await getPostsByUser();
  // console.log(data);
  try {
    posts.value = data;
    filterPostList.value = posts.value;
  } catch (error) {
    console.log(error);
  }
};

onMounted(async () => {
  await fetchData();
});
</script>
