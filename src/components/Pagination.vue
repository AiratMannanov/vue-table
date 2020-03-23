<template>
  <div class="pages">
    <p>Rows per Page</p>
    <div class="inputWrapper">
      <input type="range" v-model="rowsPerPage" min="10" max="25" />
      <p>{{rowsPerPage}}</p>
    </div>
    <p
      :style="[Boolean(pageInQueue === page) ? {'border': '1px solid red'} : {'textDecoration': 'none'}]"
      @click="SET_PAGE(pageInQueue)"
      v-for="pageInQueue in queuePages"
      class="pageBtn"
    >{{pageInQueue}}</p>
  </div>
</template>

<script>
import { mapGetters, mapMutations, mapActions } from "vuex";
export default {
  name: "Pagination",
  data: () => ({
    rowsPerPage: 10,
    pagesPagination: []
  }),
  computed: {
    ...mapGetters(["productsPerPage", "queuePages", "page"])
  },
  watch: {
    rowsPerPage() {
      setTimeout(() => {
        this.CHANGE_ROWS_PER_PAGE(this.rowsPerPage);
      }, 500);
    },
    page() {},
    productsPerPage() {
      this.GET_ITEMS();
    }
  },
  methods: {
    ...mapMutations(["CHANGE_ROWS_PER_PAGE", "SET_PAGE"]),
    ...mapActions(["GET_ITEMS"])
  }
};
</script>

<style lang="scss">
.pages {
  text-align: center;
  grid-column-end: 1;
  grid-row-start: 2;
  display: block;
  position: fixed;
  top: 8%;
  height: 100%;
  left: 1rem;
  p {
    margin: 0 auto;
    width: 2rem;
  }

  .inputWrapper {
    margin-top: 4rem;
    height: 8rem;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: center;
    input {
      width: 6rem;
      height: auto;
      outline: none;
      transform: rotate(-90deg);
    }
  }

  .pageBtn {
    padding: 0.5rem;
    margin-top: 0.5rem;
    cursor: pointer;
    display: block;
    border: 1px solid black;
    border-radius: 0.7rem;
    color: rgba($color: #85858591, $alpha: 1);
  }
}
</style>
