<template>
<div class="container">
  <div class="ss-account-title">
    {{title}}
  </div>
  <q-form @submit.prevent="create">
    <div class="row">
      <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-xs-12">
        <div class="ss-account-title">
          Dane użytkownika
        </div>
      </div>
      <div class="col-xl-6 col-lg-6 col-md-6">
        <q-input type="text" placeholder="Imię" v-model="data.name"/>
      </div>
      <div class="col-xl-6 col-lg-6 col-md-6">
        <q-input type="text" placeholder="Nazwisko" v-model="data.last_name"/>
      </div>
    </div>
    <div class="row mt-20">
      <div class="col-xl-4 col-lg-4 col-md-4">
        <q-input type="email" placeholder="E-mail" v-model="data.email"/>
      </div>
      <div class="col-xl-4 col-lg-4 col-md-4">
        <q-input type="password" placeholder="Hasło" v-model="data.password"/>
      </div>
      <div class="col-xl-4 col-lg-4 col-md-4">
        <q-input type="text" placeholder="Nick" v-model="data.nick"/>
      </div>
    </div>
    <div class="row mt-20">
      <div class="col-xl-4 col-lg-4 col-md-4">
        <q-input type="text" v-model="data.contact_phone" mask="+48 ###-###-###" placeholder="Telefon kontaktowy"/>
      </div>
      <div class="col-xl-4 col-lg-4 col-md-4">
        <q-select
          v-model="data.sex"
          :options="sexOptions"
          option-label="txt"
          option-value="value"
          option-disable="inactive"
          emit-value
          map-options
          label="Płeć"
        />
      </div>
      <div class="col-xl-4 col-lg-4 col-md-4">
        <q-input type="text" placeholder="Adres zamieszkania" v-model="data.location"/>
      </div>
    </div>
    <div class="row mt-20">
      <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-xs-12">
        <div class="ss-account-title">
          Dane strony
        </div>
      </div>
      <div class="col-xl-6 col-lg-6 col-md-6">
        <q-input type="text" placeholder="Tytuł strony" v-model="data.page_name"/>
        <q-input type="text" style="margin-top: 23px;" placeholder="Adres sklepu" v-model="data.localization"/>
      </div>
      <div class="col-xl-6 col-lg-6 col-md-6">
        <q-input type="textarea" placeholder="Opis strony" v-model="data.page_description"/>
      </div>
    </div>
    <div class="mt-20 row">
      <div class="col-xl-6 col-lg-6 col-md-6">
        <q-input type="email" placeholder="Adres e-mail do kontaktu" v-model="data.contact_email"/>
      </div>
      <div class="col-xl-6 col-lg-6 col-md-6">
        <q-select
          v-model="data.is_accept_new_user"
          :options="yesOrNot"
          option-label="txt"
          option-value="value"
          option-disable="inactive"
          emit-value
          map-options
          label="Czy nowy użytkownik musi być weryfikowany"
        />
      </div>
    </div>
    <div class="row mt-20">
      <q-btn type="submit" label="Zapisz"/>
    </div>
  </q-form>
</div>
</template>

<script>
  export default {
    name: "Configuration",
    data() {
      return {
        data: {
          email: '',
          password: '',
          name: '',
          last_name: '',
          nick: '',
          location: '',
          sex: '',
          contact_phone: '',
          page_name: '',
          page_description: '',
          contact_email: '',
          localization: '',
          is_accept_new_user: 0
        },
        sexOptions: [
          {value: 1, txt: 'Kobieta'},
          {value: 2, txt: 'Mężczyzna'}
        ],
        yesOrNot: [
          {value:1, txt: 'Tak'},
          {value:0, txt: 'Nie'}
        ],
        title: 'Konfiguracja strony'
      }
    },
    methods: {
      create() {
        this.$axios.post('create-page', this.data)
        .then((data) => {
          if (data.data.success === 1) {
            this.$router.push({name: 'AdminPage'});
            this.$q.notify({
              message: 'Udało się skonfigurować stronę'
            });
          }
        })
        .catch(() => {
          this.$q.notify({
            message: 'Coś poszło nie tak'
          });
        })
      }
    }
  }
</script>
