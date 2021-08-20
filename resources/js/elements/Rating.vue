<template>
  <div class="flex items-center">
    <span v-for="(a, b, index) in ratingObj.filled" :key="index">
      <SolidStarIcon class="h-6 w-6 text-yellow-400" />
    </span>
    <span v-for="(a, b, index) in ratingObj.unfilled" :key="index">
      <StarIcon class="h-5 w-5 text-yellow-400" />
    </span>
  </div>
</template>

<script>
import { StarIcon } from "@heroicons/vue/outline";
import { StarIcon as SolidStarIcon } from "@heroicons/vue/solid";

export default {
  components: {
    StarIcon,
    SolidStarIcon,
  },
  props: {
    rating: Number,
  },
  computed: {
    ratingObj: function () {
      const filled = Math.ceil(this.rating / 2);
      const unfilled = 5 - filled;

      return {
        filled: Array(filled).fill(true),
        unfilled: Array(unfilled).fill(true),
      };
    },
  },
};
</script>

<style></style>
