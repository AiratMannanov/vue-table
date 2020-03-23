<template>
  <div class="main-wrapper">
    <!--    <Navbar />-->
    <MainPage />
    <Pagination />
    <Error v-show="error" />
  </div>
</template>


<script>
import { mapGetters, mapMutations } from "vuex";
export default {
  name: "Main-page",
  components: {
    Navbar: () => import("./components/Navbar"),
    MainPage: () => import("./components/main"),
    Pagination: () => import("./components/Pagination"),
    Error: () => import("./components/Error")
  },
  computed: {
    ...mapGetters(["error"])
  },
  watch: {
    error() {
      setTimeout(() => {
        this.error && this.SET_ERROR();
      }, 2000);
    }
  },
  methods: {
    ...mapMutations(["SET_ERROR"])
  }
};
</script>

<style lang="scss">
.main-wrapper {
  width: 100%;
  height: 97vh;
  display: grid;
  grid-template-rows: 3% auto 3%;
  grid-template-columns: 7% auto 7%;
}
</style>
