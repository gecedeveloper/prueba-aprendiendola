<template>
  <div>
    <nav class="navbar is-transparent is-dark" role="navigation" aria-label="main navigation">
      <div class="navbar-brand">
        <!-- navbar items, navbar burger... -->
        <div class="navbar-burger">
          <!-- <a class="navbar-item">
            Login
          </a>
          <a class="navbar-item">
            Register
          </a> -->
        </div>
      </div>
      <div class="navbar-menu">
        <div class="navbar-end">
          <a class="navbar-item" @click="toggleLoginModal" v-if="isLoggedIn">
            {{ user.userId }}
          </a>
          <a class="navbar-item" @click="toggleLoginModal" v-else>
            Login
          </a>
        </div>
      </div>
    </nav>

    <Modal :title="'Login'" :width="300">
      <section class="modal-card-body">
        <b-field label="Email">
            <b-input
                type="email"
                :value="username"
                placeholder="Your email"
                required>
            </b-input>
        </b-field>

        <b-field label="Password">
            <b-input
                type="password"
                :value="password"
                password-reveal
                placeholder="Your password"
                required>
            </b-input>
        </b-field>

    </section>
    <footer class="modal-card-foot">
        <button class="button" type="button" @click="toggleLoginModal">Close</button>
        <button class="button is-primary" @click="login">Login</button>
    </footer>
  </Modal>

  </div>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex'
import Modal from './Modal'

export default {
  name: 'Navbar',
  components: {
    Modal
  },
  data () {
    return {
      username: 'uchiha',
      password: '123456'
    }
  },
  computed: {
    ...mapGetters([
      'loginModal',
      'user',
      'isLoggedIn'
    ])
  },
  methods: {
    ...mapMutations({
      toggleLoginModal: 'toggleLoginModal'
    }),
    async login () {
      this.$store.dispatch('login', { username: this.username, password: this.password }).then(response => {
        console.log('logeando')
      }, error => {
        console.error(error.message)
      })
    }
  }
}
</script>
