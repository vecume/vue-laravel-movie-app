<template>
  <div
    class="
      shadow-lg
      px-5
      py-4
      bg-white
      fixed
      top-0
      right-0
      w-full
      header
      z-10
      flex
      justify-between
      items-center
    "
    :class="!menu ? 'header--full' : ''"
  >
    <button type="button" @click="toggleMenu()">
      <ChevronDoubleLeftIcon
        class="h-5 w-5 text-gray-700 transform transition duration-300"
        :class="menu ? '' : 'rotate-180'"
      />
    </button>
    <search-bar />
  </div>
</template>

<script>
import SearchBar from "./SearchBar.vue";
import { ChevronDoubleLeftIcon } from "@heroicons/vue/outline";
import useMenu from "../hooks/useMenu";

export default {
  components: { SearchBar, ChevronDoubleLeftIcon },
  setup() {
    const { menu, toggleMenu } = useMenu();

    return { menu, toggleMenu };
  },
};
</script>

<style>
.header {
  min-width: calc(100% - 250px);
  max-width: calc(100% - 250px);
}

.header--full {
  min-width: 100%;
  max-width: 100%;
}
</style>
