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
    <q-form @submit.prevent="update">
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
    name: "EditShipment",
    data() {
      return {
        title: 'Zmień dane opcji wysyłki',
        data: {
          name: '',
          price: 0,
          additional_information: ''
        }
      }
    },
    methods: {
      loadDataShipment() {
        let id = this.$route.params.id;
        this.$axios.get(`admin/orders/shipments/find/${id}`)
          .then((data) => {
            let shipment = data.data.data;
            this.data.name = shipment.name;
            this.data.price = shipment.price;
            this.data.additional_information = shipment.additional_information;
          })
          .catch(() => {
            this.$q.notify({
              message: 'Nie udało się załadować danych'
            });
            this.$router.push({
              name: 'ShipmentsList'
            })
          })
      },
      update() {
        this.$axios.put(`admin/orders/shipments/update/${this.$route.params.id}`, this.data)
          .then((data) => {
            if (data.data.success === 1) {
              this.$router.push({
                name: 'ShipmentsList'
              });
              this.$q.notify({
                message: 'Dane zostały zmienione'
              });
            }
          })
          .catch(() => {
            this.$q.notify({
              message: 'Coś poszło nie tak'
            })
          })
      }
    },
    created() {
      this.loadDataShipment();
    }
  }
</script>

<style scoped>

</style>
