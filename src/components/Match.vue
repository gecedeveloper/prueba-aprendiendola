<template>
  <div class="notification">
    <div class="level">
      <div class="level-item has-text-centered">
        <div>
          <p class="heading">Cuando</p>
          <p class="title">{{ match.when }}</p>
        </div>
      </div>
      <div class="level-item has-text-centered">
        <div>
          <p class="heading">{{ teamOneScore }} - {{ teamTwoScore }}</p>
          <p class="title">{{ match.teamOne.name }} vs {{ match.teamTwo.name }}</p>
        </div>
      </div>
      <div class="level-item has-text-right">
        <div>
          <button class="button is-primary"
            @click="togglePredictionModal">
            Predecir Resuldatdo
        </button>
        </div>
      </div>
    </div>
    <PredictionModal :title="'Predecir Resultado'" :width="500">
      <section class="modal-card-body">
        <b-field label="Equipo A">
            <b-input
                type="text"
                :value="scoreA"
                required>
            </b-input>
        </b-field>

        <b-field label="Equipo B">
            <b-input
                type="text"
                :value="scoreB"
                required>
            </b-input>
        </b-field>
      </section>
      <footer class="modal-card-foot">
          <button class="button" type="button" @click="togglePredictionModal">Close</button>
          <button class="button is-primary" @click="predict" :disabled="!isLoggedIn">Predecir</button>
          <span v-if="!isLoggedIn">Debes iniciar sesión para predecir.</span>
      </footer>
    </PredictionModal>
  </div>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex'

import PredictionModal from './PredictionModal'

export default {
  name: 'Match',
  props: ['match'],
  components: {
    PredictionModal
  },
  data () {
    return {
      scoreA: this.teamOneScore,
      scoreB: this.teamTwoScore
    }
  },
  computed: {
    predictionModal: {
      get: function () {
        return this.$store.state.predictionModal
      },
      set: function (newValue) {
        this.togglePredictionModal()
      }
    },
    teamOneScore: function () {
      return Object.keys(this.match.score).length === 0 ? 0 : this.match.score.teamOne
    },
    teamTwoScore: function () {
      return Object.keys(this.match.score).length === 0 ? 0 : this.match.score.teamTwo
    },
    ...mapGetters([
      'user',
      'isLoggedIn'
    ])
  },
  methods: {
    ...mapMutations({
      togglePredictionModal: 'togglePredictionModal'
    }),
    async predict () {
      const data = {
        score: {
          teamOne: this.scoreA,
          teamTwo: this.scoreB
        },
        gamerId: this.user.userId,
        matchId: this.match.id
      }
      this.$store.dispatch('predict', {data: data, token: this.user.id}).then(response => {
        console.log('exito')
      }, error => {
        console.error(error.message)
      })
    }
  }
}
</script>
