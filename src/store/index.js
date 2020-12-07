import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);


export default new Vuex.Store({
    state: {
        user: JSON.parse(localStorage.getItem('user')),
    },
    mutations: {
        setUser(state,user){
            state.user = user;
        },
        destroyUser(state){
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
            
            commit('setUser',user);
        },
        logout({commit}){
            commit('destroyUser');
        },
    },
    modules: {}
});
