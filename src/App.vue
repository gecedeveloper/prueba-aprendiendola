<template>
  <div id="app" class="container">
    <Navbar/>
    <HelloWorld/>
    <br>
    <Match v-for="match in matches" :key="match.id" :match="match"/>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

import HelloWorld from './components/HelloWorld'
import Match from './components/Match'
import Navbar from './components/Navbar'

export default {
  name: 'App',
  components: {
    HelloWorld,
    Match,
    Navbar
  },
  computed: {
    ...mapGetters([
      'matches'
    ])
  },
  mounted: function () {
    this.getMatches()
  },
  methods: {
    async getMatches () {
      this.$store.dispatch('getMatches').then(response => {
        console.log('fetching matches')
      }, error => {
        console.error(error.message)
      })
    }
  }
}
</script>

<style>
html {
  background-image: url("assets/img/fondo.jpg");
}
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
