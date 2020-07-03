<template>
  <div class="container">
    <div class="row q-tabs__content--align-center mt-40">
      <div class="col-xl-4 col-lg-4 col-md-4">
        <div class="auth">
          <q-form @submit.prevent="login">
            <q-input type="email" class="mt-20" placeholder="E-mail" v-model="data.email"/>
            <q-input type="password" class="mt-20" placeholder="Hasło" v-model="data.password"/>
            <q-btn type="submit" class="mt-20">Zapisz</q-btn>
          </q-form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "AdminPage",
    data() {
      return {
        data: {
          email: '',
          password: ''
        }
      }
    },
    methods: {
      login() {
        this.$axios.post('auth/login', this.data)
          .then((data) => {
            if (data.data.success === 1) {
              localStorage.setItem('token', data.data.access_token);
              localStorage.setItem('userId', data.data.user_id);
              localStorage.setItem('name', data.data.name);
            }
          })
          .catch(() => {
            this.$q.notify({
              message: 'Coś poszło nie tak'
            })
          })
      }
    }
  }
</script>
