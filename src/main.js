import Vue from 'vue'
import Vuex from 'vuex'
import VueLocalStorage from 'vue-localstorage'
import axios from 'axios'
import App from './App'
import Buefy from 'buefy'
import 'buefy/lib/buefy.css'

Vue.config.productionTip = false

Vue.use(Buefy)
Vue.use(Vuex)
Vue.use(axios)
Vue.use(VueLocalStorage)

const store = new Vuex.Store({
  state: {
    loginModal: false,
    predictionModal: false,
    user: null,
    matches: []
  },
  mutations: {
    toggleLoginModal (state) {
      state.loginModal = !state.loginModal
    },
    togglePredictionModal (state) {
      state.predictionModal = !state.predictionModal
    },
    setUser (state, payload) {
      state.user = payload
    },
    setMatches (state, payload) {
      state.matches = payload
    }
  },
  actions: {
    async login ({ commit }, payload) {
      let URL = 'http://polla.testing.aprendiendo.la/api/gamers/login'
      axios.post(URL, payload)
        .then(function (response) {
          let data = response.data
          Vue.localStorage.set('session_user', data)
          commit('setUser', data)
          commit('toggleLoginModal')
        })
        .catch(function (error) {
          console.log(error)
        })
    },
    async getMatches ({ commit }, payload) {
      let URL = 'http://polla.testing.aprendiendo.la/api/matches?access_token={id}'
      axios.get(URL, payload)
        .then(function (response) {
          let data = response.data
          commit('setMatches', data)
        })
        .catch(function (error) {
          console.log(error)
        })
    },
    async predict ({ commit }, payload) {
      console.log(payload)
      let URL = 'http://polla.testing.aprendiendo.la/api/picks?access_token=' + payload.token
      axios.post(URL, payload.data)
        .then(function (response) {
          let data = response.data
          console.log(data)
          commit('toggleLoginModal')
        })
        .catch(function (error) {
          console.log(error)
        })
    }
  },
  getters: {
    loginModal: state => state.loginModal,
    predictionModal: state => state.predictionModal,
    user: state => state.user,
    isLoggedIn: state => state.user != null,
    matches: state => state.matches
  }
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  store,
  render: h => h(App)
})
