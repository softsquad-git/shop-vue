<template>
  <q-dialog v-model="modal" persistent>
    <q-card style="min-width: 350px">
      <q-card-section>
        <div class="text-h6">Dane zamówinia</div>
      </q-card-section>

      <q-card-section class="q-pt-none">
        <div
          class="q-table__container q-table--horizontal-separator column no-wrap q-table__card q-table--no-wrap no-shadow">
          <div class="q-table__middle scroll">
            <table class="q-table">
              <tbody>
              <tr>
                <td class="text-right">Imię & Nazwisko</td>
                <td class="text-right">{{ order.name }}</td>
              </tr>
              <tr>
                <td class="text-right">Kwota zamówienia</td>
                <td class="text-right">{{ order.total_price }}</td>
              </tr>
              <tr>
                <td class="text-right">Adres e-mail</td>
                <td class="text-right">{{ order.email }}</td>
              </tr>
              <tr>
                <td class="text-right">Adres dostawy</td>
                <td class="text-right">{{ order.post_code }} {{ order.city }}, ul. {{ order.address }}</td>
              </tr>
              <tr>
                <td class="text-right">Telefon</td>
                <td class="text-right">{{ order .phone }}</td>
              </tr>
              <tr>
                <td class="text-right">Dodatkowe informacje</td>
                <td class="text-right">{{ order.additional_information ? order.additional_information : 'Brak' }}</td>
              </tr>
              <tr>
                <td class="text-right">Sposób dostawy</td>
                <td class="text-right">{{ order.shipment }}</td>
              </tr>
              </tbody>
            </table>
          </div>
        </div>
      </q-card-section>

      <q-card-actions align="right" class="text-primary">
        <q-btn flat size="sm" label="Zamknij" v-close-popup/>
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script>
  export default {
    name: "OrderShow",
    data() {
      return {
        modal: false,
        order: {}
      }
    },
    methods: {
      openModal(id) {
        this.$axios.get(`admin/orders/find/${id}`)
          .then((data) => {
            this.order = data.data.data;
            this.modal = true;
          })
          .catch(() => {
            this.$q.notify({
              message: 'Nie udało się załadować danych'
            })
          })
      }
    }
  }
</script>
