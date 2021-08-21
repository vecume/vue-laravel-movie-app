<template>
  <div class="p-8">
    <spinner v-if="mLoading" />
    <div
      v-else
      class="grid grid-cols-1 gap-x-5 md:grid-cols-2 xl:grid-cols-3 mb-10"
    >
      <div class="movie-img-wrapper">
        <img
          :src="`${IMAGE_URL}${IMAGE_SIZE}${movieRes?.data?.poster_path}`"
          :alt="movieRes?.data?.title"
          class="shadow-md rounded-md mb-5"
        />
        <div class="flex items-center justify-between">
          <a
            :href="`https://www.imdb.com/title/${movieRes?.data?.imdb_id}`"
            target="_blank"
            class="
              py-3
              px-6
              text-center
              bg-yellow-500
              w-1/2
              rounded-l-lg
              font-semibold
              transition
              duration-300
              hover:bg-yellow-300
            "
            >IMDB</a
          >
          <a
            v-if="!vLoading && videoRes?.data?.results[0]?.site === 'YouTube'"
            :href="`https://www.youtube.com/watch?v=${videoRes?.data?.results[0].key}`"
            target="_blank"
            class="
              py-3
              px-6
              text-center
              bg-red-700
              text-white
              w-1/2
              rounded-r-lg
              font-semibold
              transition
              duration-300
              hover:bg-red-500
            "
            >TRAILER</a
          >
        </div>
      </div>
      <div class="col-span-1 xl:col-span-2">
        <div class="mb-3">
          <h2 class="text-5xl mb-2 uppercase font-light">
            {{ movieRes?.data?.title }}
          </h2>
          <p class="font-medium uppercase">{{ movieRes?.data?.tagline }}</p>
        </div>
        <div class="flex justify-between items-center mb-10 flex-wrap">
          <div class="flex items-center">
            <rating :rating="movieRes?.data?.vote_average" />
            <span class="font-semibold inline-block ml-2">{{
              movieRes?.data?.vote_average
            }}</span>
          </div>
          <div class="text-blue-600 font-bold uppercase">
            {{
              `${movieRes?.data?.spoken_languages[0].name} / ${
                movieRes?.data?.runtime
              } min. / ${movieRes?.data?.release_date.split("-")[0]}`
            }}
          </div>
        </div>

        <div class="mb-10">
          <h3 class="font-semibold mb-3">THE GENRES</h3>
          <ul class="flex items-center flex-wrap">
            <li
              class="mr-1"
              v-for="genre in movieRes?.data?.genres"
              :key="genre.id"
            >
              <sidebar-item
                :to="`/movies/genre/sort/${genre.name}_${genre.id}`"
                :title="genre.name"
              >
                <PlayIcon class="h-5 w-5 text-gray-700 mr-1" />
              </sidebar-item>
            </li>
          </ul>
        </div>

        <div class="mb-10">
          <h3 class="font-semibold mb-3">OVERVIEW</h3>
          <p>{{ movieRes?.data?.overview }}</p>
        </div>

        <div class="mb-10">
          <h3 class="font-semibold mb-3">THE CAST</h3>
          <spinner v-if="cLoading" />
          <div v-else>
            <router-link
              :to="`/person/${cast.id}`"
              v-for="(cast, _, i) in castsRes?.data?.cast"
              :key="cast.id"
              class="
                text-blue-600
                hover:text-blue-800 hover:underline
                transition
                duration-300
              "
            >
              {{ cast.name }}{{ castsRes?.data?.cast.length !== i ? ", " : "" }}
            </router-link>
          </div>
        </div>

        <div class="flex"></div>
      </div>
    </div>

    <spinner v-if="sLoading" />
    <div v-else>
      <h2 class="text-3xl font-semibold mb-5 uppercase">Similar Movies</h2>
      <div class="flex justify-evenly flex-wrap">
        <movie-item
          v-for="movie in similarRes?.data?.results"
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
import SidebarItem from "../elements/SidebarItem.vue";
import Spinner from "../elements/Spinner.vue";
import useAxios from "../hooks/useAxios";
import { PlayIcon } from "@heroicons/vue/solid";
import MovieItem from "../components/MovieItem.vue";
export default {
  components: { Spinner, Rating, SidebarItem, PlayIcon, MovieItem },
  setup() {
    const route = useRoute();
    const { id } = route.params;
    const { loading: mLoading, response: movieRes } = useAxios({
      endpoint: `movie/${id}`,
    });
    const { loading: cLoading, response: castsRes } = useAxios({
      endpoint: `movie/${id}/casts`,
    });
    const { loading: vLoading, response: videoRes } = useAxios({
      endpoint: `movie/${id}/videos`,
    });
    const { loading: sLoading, response: similarRes } = useAxios({
      endpoint: `movie/${id}/similar`,
    });

    return {
      mLoading,
      movieRes,
      castsRes,
      cLoading,
      videoRes,
      vLoading,
      sLoading,
      similarRes,
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
