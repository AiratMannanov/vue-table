<template>
  <div class="columns">
    <div class="row">
      <p v-if="!button.hidden" v-for="button in buttons" @click="SET_SORTED(button.name)">
        {{button.name}}
        <i
          @click="setHidden(button.name)"
          style="margin-left: 0.3rem; cursor: pointer"
          class="ion-md-close-circle"
        ></i>
        <i
          style="margin-left: 0.5rem; cursor: pointer"
          v-show="button.sorted"
          class="ion-md-arrow-down"
        ></i>
      </p>

      <hiddenColumns />
    </div>
    <Loader v-show="loader" />
    <div
      v-show="Object.keys(currentProducts).length"
      v-for="product in currentProducts"
      :key="product.id"
      class="row"
      :style="[deletedProducts[product.id] ? {'textDecoration': 'line-trough'} : {'textDecoration': 'none'}]"
      @click="collectDeleted(product.id)"
    >
      <p
        v-show="Object.keys(currentProducts).length"
        v-for="productValue of productValues"
      >{{product[productValue]}}</p>
    </div>

    <confirmDelete />
  </div>
</template>

<script>
import { mapGetters, mapActions, mapMutations } from "vuex";
import { sortByCategory } from "../../utils/sortedFunc";

export default {
  name: "Table",
  data: () => ({
    currentProducts: [],
    productValue: [],
    productValues: []
  }),
  computed: {
    ...mapGetters(["buttons", "pages", "deletedProducts", "page", "loader"])
  },
  watch: {
    pages() {
      if (this.pages) {
        debugger;
        this.currentProducts = this.pages[this.page];
        const keys = Object.keys(this.buttons)
          .filter(btn => !this.buttons[btn]["hidden"])
          .map(value => value.toLocaleLowerCase());
        this.productValues = [...keys];
      }
    },
    page() {
      if (this.pages) {
        debugger;
        this.currentProducts = this.pages[this.page];
        const keys = Object.keys(this.buttons)
          .filter(btn => !this.buttons[btn]["hidden"])
          .map(value => value.toLocaleLowerCase());
        this.productValues = [...keys];
      }
    },
    buttons() {
      const keys = Object.keys(this.buttons)
        .filter(btn => !this.buttons[btn]["hidden"])
        .map(value => value.toLocaleLowerCase());
      this.productValues = [...keys];
      const sortedKey = keys.filter(
        btn => this.buttons[btn[0].toUpperCase() + btn.slice(1)]["sorted"]
      );
      switch (sortedKey[0]) {
        case "calories":
          this.currentProducts = sortByCategory(
            this.currentProducts,
            "calories"
          );
          break;
        case "fat":
          this.currentProducts = sortByCategory(this.currentProducts, "fat");
          break;
        case "carbs":
          this.currentProducts = sortByCategory(this.currentProducts, "carbs");
          break;
        case "protein":
          this.currentProducts = sortByCategory(
            this.currentProducts,
            "protein"
          );
          break;
        case "iron":
          this.currentProducts = sortByCategory(this.currentProducts, "iron");
          break;
        case "product":
          this.currentProducts = sortByCategory(
            this.currentProducts,
            "product"
          );
          break;
        default:
          this.currentProducts = this.pages[this.page];
      }
    },
    loader() {}
  },
  methods: {
    ...mapActions(["GET_ITEMS"]),
    ...mapMutations([
      "SET_SORTED",
      "setActive",
      "setHidden",
      "DELETE_PRODUCT",
      "ADD_DELETED_PRODUCTS",
      "GET_PAGES"
    ]),
    collectDeleted(buttonId) {
      const row = event.currentTarget;
      row.style.textDecoration = "line-through";
      this.ADD_DELETED_PRODUCTS(buttonId);
    }
  },
  mounted() {
    this.GET_ITEMS();
  },
  components: {
    hiddenColumns: () => import("../hidden-columns"),
    confirmDelete: () => import("../confirmDelete"),
    Loader: () => import("../Loader")
  }
};
</script>

<style lang="scss">
.columns {
  position: relative;
  grid-row-start: 2;
  grid-column-start: 2;
  grid-column-end: 3;
  justify-self: stretch;
  align-self: flex-start;
  width: 100%;
  display: flex;
  flex-direction: column;
  margin-left: 0.5rem;
  z-index: 1;
  .row {
    position: relative;
    font-size: 1rem;
    display: flex;
    width: 100%;
    justify-content: space-around;
    border-bottom: 1px solid black;

    p {
      cursor: pointer;
      width: 8rem;
      display: block;
      padding: 1rem;
      height: 20%;
      margin: 1rem 0 0 0;
      justify-self: center;
    }
  }
}
</style>
