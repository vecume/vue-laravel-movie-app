<template>
  <router-link
    :to="`/movie/${id}`"
    class="
      rounded
      overflow-hidden
      shadow-md
      w-60
      mb-4
      no-underline
      transform
      hover:shadow-xl hover:-translate-y-2
      block
      transition-all
      duration-300
    "
  >
    <img
      class="w-full object-cover movie-img"
      height="360"
      width="240"
      :src="`${IMG_URL}${POSTER_SIZE}${image}`"
      alt="Mountain"
    />
    <div class="px-4 py-3">
      <div class="font-bold text-xl mb-1 truncate" :title="title">
        {{ title }}
      </div>
      <p :title="description" class="text-gray-700 text-base truncate">
        {{ description }}
      </p>
    </div>
  </router-link>
</template>

<script>
import { IMAGE_BASE_URL, POSTER_SIZE } from "../config";
export default {
  props: {
    title: String,
    description: String,
    image: String,
    rating: Number,
    id: Number,
  },
  data() {
    return {
      IMG_URL: IMAGE_BASE_URL,
      POSTER_SIZE,
    };
  },
};
</script>

<style>
.movie-img {
  width: 100%;
  min-height: 360px;
  max-height: 360px;
}
</style>
