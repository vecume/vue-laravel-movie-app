<template>
  <div class="p-8">
    <spinner v-if="mLoading" />
    <div
      v-else
      class="grid grid-cols-1 gap-x-5 md:grid-cols-2 xl:grid-cols-3 mb-10"
    >
      <div class="movie-img-wrapper">
        <img
          :src="`${IMAGE_URL}${IMAGE_SIZE}${personRes?.data?.profile_path}`"
          :alt="personRes?.data?.title"
          class="shadow-md rounded-md mb-5"
        />
        <div class="flex items-center justify-between">
          <a
            :href="`https://www.imdb.com/name/${personRes?.data?.imdb_id}`"
            target="_blank"
            class="
              py-3
              px-6
              text-center
              bg-yellow-500
              w-full
              rounded-lg
              font-semibold
              transition
              duration-300
              hover:bg-yellow-300
            "
            >IMDB</a
          >
        </div>
      </div>
      <div class="col-span-1 xl:col-span-2">
        <div class="mb-3">
          <h2 class="text-5xl mb-2 uppercase font-light">
            {{ personRes?.data?.name }}
          </h2>
          <p class="font-medium uppercase">
            {{ personRes?.data?.place_of_birth }}
          </p>
        </div>
        <div class="flex justify-between items-center mb-10 flex-wrap">
          <div class="flex items-center">
            <rating :rating="personRes?.data?.popularity / 5" />
            <span class="font-semibold inline-block ml-2">{{
              personRes?.data?.popularity
            }}</span>
          </div>
          <div class="text-blue-600 font-bold uppercase">
            {{ personRes?.data?.birthday }}
          </div>
        </div>

        <div class="mb-10">
          <h3 class="font-semibold mb-3">THE BIOGRAPHY</h3>
          <p>{{ personRes?.data?.biography }}</p>
        </div>
      </div>
    </div>

    <spinner v-if="cLoading" />
    <div v-else>
      <h2 class="text-3xl font-semibold mb-5 uppercase">The Cast</h2>
      <div class="flex justify-evenly flex-wrap">
        <movie-item
          v-for="movie in creditsRes?.data?.cast"
          :key="movie.id"
          :title="movie.title"
          :description="movie.overview"
          :image="movie.poster_path"
          :id="movie.id"
        />
      </div>
    </div>
  </div>
</template>

<script>
import { useRoute } from "vue-router";
import { IMAGE_BASE_URL, POSTER_SIZE } from "../config";
import Rating from "../elements/Rating.vue";
import Spinner from "../elements/Spinner.vue";
import useAxios from "../hooks/useAxios";
import MovieItem from "../components/MovieItem.vue";
export default {
  components: { Spinner, Rating, MovieItem },
  setup() {
    const route = useRoute();
    const { id } = route.params;
    const { loading: pLoading, response: personRes } = useAxios({
      endpoint: `person/${id}`,
    });
    const { loading: cLoading, response: creditsRes } = useAxios({
      endpoint: `person/${id}/movie_credits`,
    });

    return {
      pLoading,
      personRes,
      cLoading,
      creditsRes,
      IMAGE_URL: IMAGE_BASE_URL,
      IMAGE_SIZE: POSTER_SIZE,
    };
  },
};
</script>

<style>
.movie-img-wrapper {
  min-width: 280px;
}
.movie-img-wrapper img {
  width: 100%;
}
</style>
