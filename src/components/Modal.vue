<template>
  <b-modal :active.sync="loginModal" :width="width" scroll="keep">
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
  name: 'Modal',
  props: ['title', 'width'],
  computed: {
    loginModal: {
      get: function () {
        return this.$store.state.loginModal
      },
      set: function (newValue) {
        this.toggleLoginModal()
      }
    }
  },
  methods: {
    ...mapMutations({
      toggleLoginModal: 'toggleLoginModal'
    })
  }
}
</script>
