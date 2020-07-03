<template>
  <div class="p-10">
    <div class="ss-account-title">
      {{title}}
      <div class="float-right">
        <q-btn type="button" icon="add" :to="{name: 'CreateShipment'}" size="xs" round color="positive">
          <q-tooltip>
            Dodaj
          </q-tooltip>
        </q-btn>
      </div>
    </div>
    <div
      class="q-table__container q-table--horizontal-separator column no-wrap q-table__card q-table--no-wrap no-shadow">
      <div class="q-table__middle scroll">
        <table class="q-table">
          <thead>
          <tr>
            <th class="text-right sortable">ID</th>
            <th class="text-right sortable">Nazwa</th>
            <th class="text-right sortable">Cena</th>
            <th class="text-right">Dodatkowe informacje</th>
            <th class="text-right">Opcje</th>
          </tr>
          </thead>
          <tbody>
          <tr v-for="shipment in shipments">
            <td class="text-right">{{ shipment.id }}</td>
            <td class="text-right">{{ shipment.name }}</td>
            <td class="text-right">{{ shipment.price }}</td>
            <td class="text-right">{{ shipment.additional_information ? shipment.additional_information : 'Nie dodano'
              }}
            </td>
            <td class="text-right">
              <q-btn-dropdown label="Opcje" size="sm">
                <q-list>
                  <q-item clickable :to="{name: 'EditShipment', params: {id: shipment.id}}">
                    <q-item-section v-close-popup>
                      <q-item-label>Edytuj</q-item-label>
                    </q-item-section>
                  </q-item>
                  <q-item clickable @click="removeShipment(shipment.id)">
                    <q-item-section v-close-popup>
                      <q-item-label>Usuń</q-item-label>
                    </q-item-section>
                  </q-item>
                </q-list>
              </q-btn-dropdown>
            </td>
          </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "ShipmentsList",
    data() {
      return {
        title: 'Opcje wysyłki',
        shipments: []
      }
    },
    methods: {
      loadData() {
        this.$axios.get('admin/orders/shipments/get')
          .then((data) => {
            this.shipments = data.data.data;
          })
          .catch(() => {
            this.$q.notify({
              message: 'Nie udało się załadować opcji wysyłki'
            })
          })
      },
      removeShipment(id) {
        this.$axios.delete(`admin/orders/shipments/remove/${id}`)
          .then((data) => {
            if (data.data.success === 1) {
              this.loadData();
              this.$q.notify({
                message: 'Element został usunięty'
              });
            }
          })
          .catch(() => {
            this.$q.notify({
              message: 'Coś poszlo nie tak'
            })
          })
      }
    },
    created() {
      this.loadData();
    }
  }
</script>
