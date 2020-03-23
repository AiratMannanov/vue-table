<template>
  <div v-show="numOfDeleted" class="confirmDeleteBtn">
    <p>
      Do you really wanna delete {{numOfDeleted}}
      <span v-if="numOfDeleted == 1">row?</span>
      <span v-else-if="numOfDeleted > 1">rows?</span>
    </p>
    <div style="text-align:center">
      <i @click="DELETE_PRODUCTS(deletedProducts)" class="ion-md-checkmark" />
      <i @click="CLEAR_DELETED_PRODUCTS" class="ion-md-close" />
      <Loader v-show="loader" class="loaderDelete" />
    </div>
  </div>
</template>

<script>
import { mapGetters, mapMutations, mapActions } from "vuex";
export default {
  name: "confirmDelete",
  data: () => ({
    numOfDeleted: 0
  }),
  computed: {
    ...mapGetters(["deletedProducts", "loader"])
  },
  watch: {
    deletedProducts: {
      deep: true,
      immediate: true,
      handler(val) {
        this.numOfDeleted = Object.keys(val).length;
      }
    }
  },
  methods: {
    ...mapMutations(["CLEAR_DELETED_PRODUCTS"]),
    ...mapActions(["DELETE_PRODUCTS"])
  },
  components: {
    Loader: () => import("./Loader")
  }
};
</script>

<style lang="scss">
.confirmDeleteBtn {
  position: fixed;
  bottom: 10%;
  right: 0;
  margin-right: 2rem;
  z-index: 3;

  width: 6rem;
  padding: 0.5rem;
  background: white;
  font-size: 0.9rem;
  border: 0.05rem solid black;
  border-radius: 0.2rem;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  i {
    padding: 0.6rem;
    font-size: 1rem;
    cursor: pointer;
  }

  .loaderDelete {
    position: inherit;
    font-size: 0.6rem;
    justify-self: center;
    font-weight: 400;
  }
}
</style>
