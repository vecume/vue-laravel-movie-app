import { ref } from "vue";

const menu = ref(true);

export default function useMenu() {
  function toggleMenu() {
    menu.value = !menu.value;
  }

  return {
    toggleMenu,
    menu,
  };
}
