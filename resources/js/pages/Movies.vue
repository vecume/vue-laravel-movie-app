<template>
  <div class="p-8">
    <div class="flex justify-between items-center mb-5">
      <div>
        <h3 class="text-3xl mb-1 capitalize font-light">
          {{ sort.split("_")[0] }}
        </h3>
        <h5 class="font-bold">
          Movies
          <span class="font-light text-xs"
            >showing {{ page }} of {{ totalPages }}</span
          >
        </h5>
      </div>
    </div>
    <spinner v-if="loading" />
    <div v-else class="flex justify-evenly flex-wrap">
      <movie-item
        v-for="movie in response.data.results"
        :key="movie.id"
        :title="movie.title"
        :description="movie.overview"
        :image="movie.poster_path"
        :id="movie.id"
      />
    </div>
    <div
      class="fixed bottom-4 right-4 flex items-center p-2 rounded-3xl bg-black"
    >
      <button
        type="button"
        @click="changePage(page - 1)"
        :class="page === 1 ? 'opacity-50 cursor-not-allowed' : ''"
        class="
          w-9
          h-9
          rounded-full
          bg-white
          flex
          justify-center
          items-center
          mr-1
          transform
          transition
          duration-300
          hover:scale-110
        "
      >
        <ArrowLeftIcon class="h-5 w-5 text-gray-700 mr-1" />
      </button>
      <button
        type="button"
        @click="changePage(page + 1)"
        :class="page === totalPages ? 'opacity-50 cursor-not-allowed' : ''"
        class="
          w-9
          h-9
          rounded-full
          bg-white
          flex
          justify-center
          items-center
          ml-1
          transform
          transition
          duration-300
          hover:scale-110
        "
      >
        <ArrowRightIcon class="h-5 w-5 text-gray-700 mr-1" />
      </button>
    </div>
  </div>
</template>

<script>
import { useRoute } from "vue-router";
import { ArrowLeftIcon, ArrowRightIcon } from "@heroicons/vue/outline";
import MovieItem from "../components/MovieItem.vue";
import Spinner from "../elements/Spinner.vue";
import useAxios from "../hooks/useAxios";
import useState from "../hooks/useState";
import { watch } from "@vue/runtime-core";
export default {
  components: { MovieItem, Spinner, ArrowLeftIcon, ArrowRightIcon },
  data() {
    return {
      type: this.$route.params.type,
      sort: this.$route.params.sort,
    };
  },

  setup() {
    const route = useRoute();
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const { loading, error, fetchData, response } = useAxios({}, true);
    const params = route.params;
    let url = "";
    switch (params.type) {
      case "movie":
        url = `movie/${params.sort}`;
        break;
      case "genre":
        url = `discover/movie?with_genres=${params.sort.split("_")[1]}`;
        break;
      case "search":
        url = `search/movie?query=${params.sort}`;
        break;
      default:
        url = "movie/popular";
        break;
    }

    fetchData({
      fendpoint: url,
    });

    watch(page, (newPage) =>
      fetchData({
        fendpoint: url,
        fparams: {
          page: newPage,
        },
      })
    );

    watch(response, (res) => {
      if (res?.data?.total_pages) {
        setTotalPages(res?.data?.total_pages);
      }
    });

    function changePage(newPage) {
      if (newPage >= 1 && newPage <= totalPages.value) {
        setPage(newPage);
      }
    }

    return {
      loading,
      error,
      fetchData,
      response,
      changePage,
      page,
      totalPages,
    };
  },
};
</script>

<style></style>
