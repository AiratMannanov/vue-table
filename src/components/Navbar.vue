<template>
  <ul class="navbar">
    <NavbarItem v-for="button of buttons" :button='button' :key="button.name" />
    <div  @mouseenter="setOptions" @mouseleave="setOptions" class="dropDown">
      <p>Hidden columns <i class="ion-ios-arrow-down"/></p>
      <div v-if="showOptions" class="dropDownHidden">
        <div v-for="button of hiddenButtons" v-if="button.hidden" @click="setHidden(button.name)" class="form-group">
<!--          <input type="checkbox" :id="button.link" :value="button.description" v-model="checkedNames">-->
          <label  :for="button.link">{{button.description}}</label>
        </div>
      </div>
    </div>
  </ul>
</template>

<script>
import NavbarItem from './NavbarItems/NavbarItem'
import { mapGetters, mapMutations }  from 'vuex'

export default {
  name: "Navbar",
  data: () => ({
    buttons: {},
    checkedNames: [],
    showOptions: false,
  }),
  methods: {
    ...mapMutations(['setHidden']),
    setOptions: function (event) {
      event.stopImmediatePropagation()
      this.showOptions = !this.showOptions;
    }
  },
  mounted() {
    this.buttons = Object.assign({}, this.buttons, this.$store.getters.buttons);
  },
  computed: {
    ...mapGetters(['hiddenButtons']),
  },
  components: {
    NavbarItem,
  }
};
</script>

<style lang="scss">
.navbar {
  padding-inline-start: 0 !important;
  width: 100%;
  height: 100%;
  grid-row-start: 2;
  grid-column-start: 1;
  grid-column-end: 4;
  display: flex;
  justify-content: space-evenly;
  align-items: center;

  select {
    margin-left: 1rem;
    height: 70%;
    background-color: white;
    border-radius: 1px;
    font-size: 1rem;
    border: 1px solid black;
    outline: none;
  }

  .dropDown {
    cursor: pointer;
    border: 1px solid black;
    border-radius: 0.4rem;
    padding: 0 10px 0 10px;
    position: relative;
  }

  .dropDownHidden {
    display: flex;
    flex-direction: column;
    position: absolute;
    left: 0;
    border: 1px solid black;
    border-radius: 0.4rem;
    width: 100%;

    .form-group {
      margin-top: 0.25rem;
      display: flex;
      align-items: center;
      width: 100%;
      font-size: 1.2rem;

      label {
        margin-left: 0.4rem;
      }
    }

  }

  .ion-ios-arrow-down {
    margin-left: 0.3rem;
  }


}
</style>
