export default {
  state: {
    buttons: {
      Product: {
        name: 'Product',
        link: '/',
        description: 'Product',
        active: true,
        hidden: false,
        sorted: false
      },
      Calories: {
        name: 'Calories',
        link: '/calories',
        description: 'Calories(100g serving)',
        active: false,
        hidden: false,
        sorted: false
      },
      Fat: {
        name: 'Fat',
        link: '/fat',
        description: 'Fat(g)',
        active: false,
        hidden: false,
        sorted: false
      },
      Carbs: {
        name: 'Carbs',
        link: '/carbs',
        description: 'Carbs',
        active: false,
        hidden: false,
        sorted: false
      },
      Protein: {
        name: 'Protein',
        link: '/protein',
        description: 'Protein(g)',
        active: false,
        hidden: false,
        sorted: false
      },
      Iron: {
        name: 'Iron',
        link: '/iron',
        description: 'Iron(%)',
        active: false,
        hidden: false,
        sorted: false
      },
    },
    hiddenButtons: {}
  },
  mutations: {
    setActive(state, buttonName) {
      const { buttons } = state;
      const btnKeys = Object.keys(buttons);
      btnKeys.map((btn) => {
        btn === buttonName ? buttons[btn]['active'] = true : buttons[btn]['active'] = false
      })
      state.buttons = Object.assign({}, state.buttons, buttons);
    },
    setHidden(state, buttonName) {
      const { buttons } = state;
      const btnKeys = Object.keys(buttons);
      btnKeys.map((btn) => {
        if (btn === buttonName) {
          buttons[btn]['hidden'] = !buttons[btn]['hidden']
        }
      })
      state.buttons = Object.assign({}, state.buttons, buttons);
    },
    SET_SORTED(state, buttonName) {
      const { buttons } = state;
      debugger
      const btnKeys = Object.keys(buttons);
      btnKeys.map((btn) => {
        if (btn === buttonName) {
          buttons[btn]['sorted'] = true;
        } else {
          buttons[btn]['sorted'] = false;
        }
      })
      state.buttons = Object.assign({}, state.buttons, buttons);
    }
  },
  actions: {
    setActive({ commit, dispatch }, { buttonName }) {
      commit('setActive', buttonName)
    }
  },
  getters: {
    buttons: s => s.buttons,
    hiddenButtons: state => {
      const { buttons } = state;
      const keys = Object.keys(buttons);
      const { hiddenButtons } = state;
      keys.map((key) => {
        buttons[key]['hidden'] ? hiddenButtons[key] = buttons[key] : null;
      })
      return hiddenButtons;
    },
    // numberOfColums: state => {
    //   const { buttons } = state;
    //   const { hiddenButtons } = state;
    //   const lenOfBtns = Object.keys(buttons).length;
    //   const lenOfHiddenButtons = Object.keys(hiddenButtons).length
    //   const diff = lenOfBtns - lenOfHiddenButtons;
    //   const oneColumnPercent = Math.floor(100 / diff);
    //   const styleForCssColumns = [];
    //   const styleForCssOneColumn = {};
    //   debugger
    //   for (let i = 0; i < diff; i++) {
    //     styleForCssColumns.push(`${oneColumnPercent}% `)
    //   }
    //   debugger
    //   return styleForCssColumns.join('');
    // }
  }
}
