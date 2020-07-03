<template>
<div class="container">
  <div class="ss-account-title">
    {{title}}
    <div class="float-right">
      <q-btn type="button" icon="clear" :to="{name: 'ShipmentsList'}" size="xs" round color="negative">
        <q-tooltip>
          Anuluj
        </q-tooltip>
      </q-btn>
    </div>
  </div>
  <q-form @submit.prevent="create">
    <div class="row">
      <div class="col-xl-4 col-lg-4 col-md-4 col-sm-6 col-xs-12">
        <q-input type="text" v-model="data.name" placeholder="Nazwa"/>
      </div>
      <div class="col-xl-4 col-lg-4 col-md-4 col-sm-6 col-xs-12">
        <q-input type="text" v-model="data.price" placeholder="Cena" mask="#.#" fill-mask="0" reverse-fill-mask/>
      </div>
      <div class="col-xl-4 col-lg-4 col-md-4 col-sm-12 col-xs-12">
        <q-input type="textarea" v-model="data.additional_information" placeholder="Dodatkowe informacje"/>
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
        name: "CreateShipment",
      data() {
          return{
            title: 'Dodaj opcję wysyłki',
            data: {
              name: '',
              price: 0,
              additional_information: ''
            }
          }
      },
      methods: {
          create() {
            this.$axios.post('admin/orders/shipments/store', this.data)
            .then((data) => {
              if (data.data.success === 1) {
                this.$router.push({
                  name: 'ShipmentsList'
                });
                this.$q.notify({
                  message: 'Opcja wysyłki została dodana'
                })
              }
            })
            .catch((error) =>{
              this.$q.notify({
                message: 'Cos poszło nie tak'
              })
            })
          }
      }
    }
</script>
