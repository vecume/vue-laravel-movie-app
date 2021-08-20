<template>
  <router-link v-bind="$props" custom v-slot="{ isActive, href, navigate }">
    <a
      v-bind="$attrs"
      :href="href"
      @click="navigate"
      :class="isActive ? 'border-black' : ''"
      class="
        flex
        items-center
        py-1
        px-3
        border border-transparent
        rounded-3xl
        hover:border-black
        transition
        duration-300
      "
    >
      <slot />
      <h5
        class="font-semibold transition"
        :class="isActive ? 'text-black' : ' text-gray-400'"
      >
        {{ title }}
      </h5>
    </a>
  </router-link>
</template>

<script>
import { RouterLink } from "vue-router";

export default {
  name: "SidebarItem",
  inheritAttrs: false,

  props: {
    ...RouterLink.props,
    title: String,
  },
};
</script>

<style></style>
