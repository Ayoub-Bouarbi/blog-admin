import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);


export default new Vuex.Store({
    state: {
        user: JSON.parse(localStorage.getItem('user')),
    },
    mutations: {
        setToken(state,user){
            state.user = user;
        },
        destroyToken(state){
            localStorage.removeItem('user');
            state.user = null;
        }
    },
    getters: {
        loggedIn(state){
            return state.user != null;
        },
        getUser(state){
            return state.user;
        }
    },
    actions: {
        storeUserData({commit},user){
            localStorage.setItem('user',JSON.stringify(user));
            
            commit('setToken',user);
        },
        logout({commit}){
            commit('destroyToken');
        },
    },
    modules: {}
});
