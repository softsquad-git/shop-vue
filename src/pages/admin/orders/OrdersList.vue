<template>
  <div class="p-10">
    <div class="ss-account-title">
      {{title}}
      <div class="float-right">
        <q-btn @click="searchModal = true" type="button" icon="search" size="xs" round>
          <q-tooltip>
            Szukaj
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
            <th class="text-right sortable">Imię i nazwisko</th>
            <th class="text-right sortable">Data złożenia</th>
            <th class="text-right sortable">Kwota zamówienia</th>
            <th class="text-right sortable">Status</th>
            <th class="text-right sortable">Adres</th>
            <th class="text-right">Opcje</th>
          </tr>
          </thead>
          <tbody>
          <tr v-for="order in orders">
            <td class="text-right">{{ order.id }}</td>
            <td class="text-right">{{ order.name }}</td>
            <td class="text-right">{{ order.created_at | moment('dddd, MMMM Do YYYY, h:mm:ss a') }}</td>
            <td class="text-right">{{ order.total_price }}</td>
            <td class="text-right"><b>{{ checkStatus(order.status).txt }}</b></td>
            <td class="text-right">{{ order.post_code }} {{ order.city }}, ul. {{ order.address }}</td>
            <td class="text-right">
              <q-btn type="button" @click="showData(order.id)" round icon="visibility" size="sm">
                <q-tooltip>
                  Zobacz szczegóły zamówienia
                </q-tooltip>
              </q-btn>
            </td>
          </tr>
          </tbody>
        </table>
      </div>
    </div>
    <order-show ref="showDataOrder"/>
    <q-dialog v-model="searchModal" :position="'top'">
      <q-card class="width-search-modal">
        <q-form @submit.prevent="loadDataOrders">
          <div class="row">
            <div class="col-xl-6 col-lg-6 col-md-6">
              <q-input type="text" v-model="params.email" placeholder="E-mail zamawiającego"/>
            </div>
            <div class="col-xl-5 col-lg-5 col-md-5">
              <q-select
                v-model="params.status"
                :options="statuses"
                option-label="t"
                option-value="v"
                option-disable="inactive"
                emit-value
                map-options
                label="Wybierz status ..."
              />
            </div>
            <div class="col-xl-1 col-lg-1 col-md-1">
              <q-btn type="submit" flat icon="search" class="full-width mt-10"/>
            </div>
          </div>
        </q-form>
      </q-card>
    </q-dialog>
  </div>
</template>

<script>
  import OrderShow from "pages/admin/orders/OrderShow";

  export default {
    name: "OrdersList",
    components: {OrderShow},
    data() {
      return {
        title: 'Złożone zamówienia',
        params: {
          email: '',
          status: ''
        },
        searchModal: false,
        orders: [],
        statuses: [
          {v: '', t: 'Wszystkie'},
          {v: 1, t: 'Przyjęto do realizacji'},
          {v: 2, t: 'Gotowe do odbioru'},
          {v: 3, t: 'Gotowe do wysyłki'},
          {v: 4, t: 'Oczekuje na płatność'},
          {v: 5, t: 'Opłacone'},
          {v: 6, t: 'Zrealizowane'}
        ]
      }
    },
    methods: {
      loadDataOrders() {
        this.$axios.get(`admin/orders/get?email=${this.params.email}&status=${this.params.status}`)
          .then((data) => {
            this.orders = data.data.data
          })
          .catch(() => {
            this.$q.notify({
              message: 'Nie udało się załadować listy zamówień'
            })
          })
      },
      checkStatus(status) {
        switch (status) {
          case 1:
            return {
              txt: 'Przyjęto do realizacji',
              bg: ''
            }
            break
          case 2:
            return {
              txt: 'Gotowe do odbioru',
              bg: ''
            }
            break
          case 3:
            return {
              txt: 'Gotowe do wysyłki',
              bg: ''
            }
            break
          case 4:
            return {
              txt: 'Oczekuje na płatność',
              bg: ''
            }
            break
          case 5:
            return {
              txt: 'Opłacone',
              bg: ''
            }
            break
          case 6:
            return {
              txt: 'Zrealizowane',
              bg: ''
            }
            break
        }
      },
      showData(id) {
        this.$refs.showDataOrder.openModal(id);
      }
    },
    created() {
      this.loadDataOrders();
    }
  }
</script>
