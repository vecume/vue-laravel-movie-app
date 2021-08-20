import Movies from "./pages/Movies.vue";
import Movie from "./pages/Movie.vue";
import Person from "./pages/Person.vue";

const routes = [
  { path: "/movies/:type/sort/:sort", component: Movies },
  { path: "/movie/:id", component: Movie },
  { path: "/person/:id", component: Person },
  {
    path: "/",
    redirect: () => ({ path: "/movies/movies/sort/popular" }),
  },
];

export default routes;
