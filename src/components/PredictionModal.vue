<template>
  <b-modal :active.sync="predictionModal" :width="width" scroll="keep">
    <form action="">
      <div class="modal-card" style="width: auto">
          <header class="modal-card-head">
              <p class="modal-card-title">{{ title }}</p>
          </header>
          <slot></slot>
      </div>
    </form>
  </b-modal>
</template>

<script>
import { mapMutations } from 'vuex'

export default {
  name: 'PredictionModal',
  props: ['title', 'width'],
  computed: {
    predictionModal: {
      get: function () {
        return this.$store.state.predictionModal
      },
      set: function (newValue) {
        this.togglePredictionModal()
      }
    }
  },
  methods: {
    ...mapMutations({
      togglePredictionModal: 'togglePredictionModal'
    })
  }
}
</script>
