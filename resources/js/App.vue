<template>
  <div class="max-h-screen custom-scrollbar">
    <Header />
    <Sidebar />
    <router-view
      v-slot="{ Component }"
      class="
        main-content
        ml-auto
        custom-scrollbar
        mt-12
        transition
        duration-300
      "
      :class="!menu ? 'main-content--full' : ''"
    >
      <!-- Use any custom transition and fallback to `fade` -->
      <transition name="fade">
        <component :is="Component" :key="$route.path" />
      </transition>
    </router-view>
  </div>
</template>

<script>
import Header from "./components/Header.vue";
import Sidebar from "./components/Sidebar.vue";
import useMenu from "./hooks/useMenu";

export default {
  components: { Sidebar, Header },

  setup() {
    const { menu } = useMenu();

    return { menu };
  },
};
</script>

<style>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

@media (min-width: 640px) {
  .main-content {
    width: calc(100% - 250px);
  }
}

.main-content--full {
  width: 100%;
}
</style>
