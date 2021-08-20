<template>
  <form v-on:submit.prevent="handleChange()">
    <input
      class="
        py-1
        px-3
        focus:border-black
        outline-none
        transition
        duration-300
        border
        rounded
      "
      :value="query"
      @input="(evt) => setQuery(evt.target.value)"
      placeholder="Search..."
      type="text"
    />
  </form>
</template>

<script>
import { useRouter } from "vue-router";
import useState from "../hooks/useState";
export default {
  setup() {
    const router = useRouter();
    const [query, setQuery] = useState("");

    function handleChange() {
      if (query.value.length > 3) {
        router.push(`/movies/search/sort/${query.value}`);
      }
    }

    return { handleChange, setQuery, query };
  },
};
</script>

<style></style>
