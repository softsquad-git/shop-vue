<template>
  <div class="f-auth-wrapper">
    <div class="container">
      <div class="f-auth shadow-1">
        <div class="row">
          <div class="col-xl-6 col-lg-6 col-md-6 col-sm-4 col-xs-12 p-10">
            <q-img src="../../../assets/images/login-page-img.png" alt="login-page-image"/>
          </div>
          <div class="col-xl-6 col-lg-6 col-md-6 col-sm-4 col-xs-12 p-10">
            <q-form class="f-auth-form" @submit.prevent="login">
              <q-input type="email" v-model="data.email" placeholder="E-mail" class="f-auth-input mt-10"/>
              <q-input type="password" v-model="data.password" placeholder="Hasło" class="f-auth-input mt-20"/>
              <q-btn type="submit" class="btn-auth mt-20" label="Zaloguj się"/>
            </q-form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
    export default {
        name: "fLogin",
      data() {
          return{
            data: {
              email: '',
              password: ''
            }
          }
      },
      methods: {
          login() {

          }
      }
    }
</script>
