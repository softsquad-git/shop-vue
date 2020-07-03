<template>
  <div class="f-auth-wrapper">
    <div class="container">
      <div class="f-auth shadow-1">
        <div class="row">
          <div class="col-xl-6 col-lg-6 col-md-6 col-sm-4 col-xs-12 p-10">
            <q-img src="../../../assets/images/login-page-img.png" alt="login-page-image"/>
          </div>
          <div class="col-xl-6 col-lg-6 col-md-6 col-sm-4 col-xs-12 p-10">
            <q-form class="f-auth-form" @submit.prevent="register">
              <div class="row">
                <div class="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-xs-12">
                  <q-input type="text" v-model="data.name" placeholder="Imię"/>
                </div>
                <div class="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-xs-12">
                  <q-input type="text" v-model="data.last_name" placeholder="Nazwisko"/>
                </div>
              </div>
              <div class="row mt-10">
                <div class="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-xs-12">
                  <q-input type="email" v-model="data.email" placeholder="E-mail"/>
                </div>
                <div class="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-xs-12">
                  <q-input type="password" v-model="data.password" placeholder="Hasło"/>
                </div>
              </div>
              <div class="row mt-10">
                <div class="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-xs-12">
                  <q-input type="text" v-model="data.nick" placeholder="Nazwa użytkownika"/>
                </div>
                <div class="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-xs-12">
                  <q-select
                    v-model="data.sex"
                    :options="sexOptions"
                    option-label="t"
                    option-value="v"
                    option-disable="inactive"
                    emit-value
                    map-options
                    label="Płeć"
                  />
                </div>
              </div>
              <div class="row mt-10">
                <div class="col-xl-8 col-lg-8 col-md-8 col-sm-12 col-xs-12">
                  <q-input type="text" v-model="data.location" placeholder="Adres zamieszkania" hint="Kod pocztowy / Miasto / ulica / numer domu | mieszkania"/>
                </div>
                <div class="col-xl-4 col-lg-4 col-md-4 col-sm-12 col-xs-12">
                  <q-input type="text" v-model="data.phone" placeholder="Numer telefonu" mask="+48 ###-###-###"/>
                </div>
              </div>
              <q-btn type="submit" class="btn-auth mt-20" label="Załóż konto"/>
            </q-form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
    export default {
        name: "fRegister",
      data() {
          return{
            data: {
              email: '',
              password: '',
              name: '',
              last_name: '',
              nick: '',
              location: '',
              sex: '',
              phone: ''
            },
            sexOptions: [
              {v: 1, t: 'Kobieta'},
              {v: 2, t: 'Mężczyzna'}
            ]
          }
      },
      methods: {
          register() {

          }
      }
    }
</script>
