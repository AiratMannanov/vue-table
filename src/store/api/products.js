import { getProducts, deleteProducts } from './request'


export default {
  state: {
    products: [],
    deletedProducts: {},
    productsPerPage: 10,
    pages: {},
    page: "1",
    loader: false,
    error: false
  },
  actions: {
    async GET_ITEMS({ commit }) {
      try {
        commit('SET_LOADER')
        const data = await getProducts();
        commit('SET_LOADER')
        commit('GET_PAGES', data);
      }
      catch (e) {
        commit('SET_LOADER')
        commit('SET_ERROR')
      }
    },
    async DELETE_PRODUCTS({ commit }, deletedIds) {
      try {
        commit('SET_LOADER')
        const { message } = await deleteProducts();
        if (message) {
          commit('SET_LOADER')
          commit('DELETE_PRODUCTS', deletedIds)
        }
      } catch (err) {
        commit('SET_LOADER')
        commit('SET_ERROR')
      }
    }
  },
  mutations: {
    GET_PAGES(state, data) {
      const { productsPerPage } = state;
      const amountOfPages = Math.round(data.length / productsPerPage);
      const newPages = {};
      for (let i = 0; i < amountOfPages; i++) {
        if (i === (amountOfPages - 1)) {
          newPages[i + 1] = [];
          newPages[i + 1] = data.slice(i * productsPerPage)
        } else {
          newPages[i + 1] = [];
          newPages[i + 1] = data.slice(i * productsPerPage, (i + 1) * productsPerPage)
        }
      }
      state.pages = newPages;
    },
    DELETE_PRODUCTS(state, deletedIds) {
      const { pages, page } = state;
      const newPages = {};
      newPages[page] = pages[page].filter((product) => {
        return !deletedIds[product.id]
      })
      state.pages = { ...state.pages, ...newPages };
      state.deletedProducts = {};
    },
    ADD_DELETED_PRODUCTS(state, productId) {
      const newDeletedProduct = {};
      newDeletedProduct[productId] = true;
      state.deletedProducts = { ...state.deletedProducts, ...newDeletedProduct }
    },
    CLEAR_DELETED_PRODUCTS(state) {
      state.deletedProducts = {};
    },
    CHANGE_ROWS_PER_PAGE(state, payload) {
      state.productsPerPage = payload;
    },
    SET_PAGE(state, pageNum) {
      state.page = pageNum;
    },
    SET_LOADER(state) {
      state.loader = !state.loader
    },
    SET_ERROR(state) {
      state.error = !state.error
    }
  },
  getters: {
    products: s => s.products,
    deletedProducts: s => s.deletedProducts,
    productsPerPage: s => s.productsPerPage,
    pages: s => s.pages,
    page: s => s.page,
    queuePages: s => {
      debugger
      const { pages, page } = s;
      const pagesKeys = Object.keys(pages)
      let queuePages = [];
      const indexOfPage = page - 1;
      if (indexOfPage === 0) {
        queuePages = pagesKeys.slice(
          indexOfPage,
          indexOfPage + 4
        );
      } else if (indexOfPage === pagesKeys.length - 1) {
        queuePages = pagesKeys.slice(indexOfPage - 4);
      } else {
        debugger
        queuePages = pagesKeys.slice(
          indexOfPage - 1,
          indexOfPage + 3
        );
      }
      return queuePages;
    },
    loader: s => s.loader,
    error: s => s.error
  }
}
