<template>
  <div
    class="
      min-h-full
      max-h-full
      overflow-y-auto
      p-5
      flex flex-col
      custom-scrollbar
      fixed
      top-0
      left-0
      transform
      transiton
      duration-300
      bg-white
      z-20
    "
    :class="menu ? 'translate-x-0' : '-translate-x-64'"
  >
    <img src="/images/movie.svg" alt="Movie" width="120" class="mx-auto my-8" />
    <div class="mb-5">
      <h3 class="font-bold mb-2">MOVIES</h3>
      <ul>
        <li class="mb-1">
          <sidebar-item to="/movies/movie/sort/popular" title="Popular">
            <HeartIcon class="h-5 w-5 text-gray-700 mr-1" />
          </sidebar-item>
        </li>
        <li class="mb-1">
          <sidebar-item to="/movies/movie/sort/top_rated" title="Top Rated">
            <PresentationChartLineIcon class="h-5 w-5 text-gray-700 mr-1" />
          </sidebar-item>
        </li>
        <li class="mb-1">
          <sidebar-item to="/movies/movie/sort/upcoming" title="Upcoming">
            <CalendarIcon class="h-5 w-5 text-gray-700 mr-1" />
          </sidebar-item>
        </li>
      </ul>
    </div>
    <div class="mb-5">
      <h3 class="font-bold mb-2">GENRES</h3>
      <spinner v-if="loading" />
      <ul v-else>
        <li class="mb-1" v-for="genre in response.data.genres" :key="genre.id">
          <sidebar-item
            :to="`/movies/genre/sort/${genre.name}_${genre.id}`"
            :title="genre.name"
          >
            <PlayIcon class="h-5 w-5 text-gray-700 mr-1" />
          </sidebar-item>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import {
  HeartIcon,
  PresentationChartLineIcon,
  CalendarIcon,
  PlayIcon,
} from "@heroicons/vue/solid";
import SidebarItem from "../elements/SidebarItem.vue";
import useAxios from "../hooks/useAxios";
import useMenu from "../hooks/useMenu";
import Spinner from "../elements/Spinner.vue";

export default {
  components: {
    HeartIcon,
    SidebarItem,
    PresentationChartLineIcon,
    CalendarIcon,
    Spinner,
    PlayIcon,
  },

  setup() {
    const { loading, error, response } = useAxios({
      endpoint: "genre/movie/list",
    });
    const { menu } = useMenu();

    return { loading, error, response, menu };
  },
};
</script>

<style scoped>
.custom-scrollbar {
  min-width: 250px;
  max-width: 250px;
}
</style>
