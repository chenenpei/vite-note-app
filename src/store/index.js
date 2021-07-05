import * as Vuex from "vuex";

const store = Vuex.createStore({
    state() {
        return {
            content: ''
        }
    },
    mutations: {
        updateContent: (state, val) => {
            state.content = val
        }
    }
});

export default store;