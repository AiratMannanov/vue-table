<template>
  <div
    @mouseenter="isVisible = true"
    @mouseleave="isVisible = false"
    class="sticky-hidden-column-btn"
  >
    <p>Columns Manager</p>
    <div v-show="isVisible" class="dropDownColumns">
      <p v-for="button in buttons" @click.stop="setHidden(button.name)">
        {{button.name}}
        <i v-if="button.hidden" class="ion-md-redo" />
        <i v-else class="ion-md-close" />
      </p>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapMutations } from "vuex";
export default {
  name: "hidden-columns",
  data: () => ({
    isVisible: false
  }),
  computed: { ...mapGetters(["buttons"]) },
  watch: {
    hidedenButtons() {
      console.log("test");
    }
  },
  methods: {
    ...mapMutations(["setHidden"])
  }
};
</script>

<style lang="scss">
.sticky-hidden-column-btn {
  text-align: center;
  position: fixed;
  top: 3rem;
  right: 1rem;
  background: white;
  font-size: 0.9rem;
  border: 0.02rem solid black;
  z-index: 2;
  padding: 0 !important;

  p {
    margin-top: 0 !important;
    padding: 0.7rem !important;
  }

  .dropDownColumns {
    p {
      padding: 0;
      text-align: center;
    }
  }
}
</style>
