<template>
  <div style="padding: 10px;">
    <div class="ss-account-title">
      {{title}}
      <div class="float-right">
        <q-btn type="button" :to="{name: 'CreateProduct'}" icon="add" size="xs" round color="positive">
          <q-tooltip>
            Dodaj produkt
          </q-tooltip>
        </q-btn>
        <q-btn type="button" @click="searchModal = true" class="ml-5" icon="search" size="xs" round>
          <q-tooltip>
            Szukaj
          </q-tooltip>
        </q-btn>
        <q-btn-dropdown class="ml-5" flat icon="pie_chart" size="xs">
          <q-list>
            <q-item clickable v-close-popup @click="onStatus('')">
              <q-item-section>
                <q-item-label>Wszystkie</q-item-label>
              </q-item-section>
            </q-item>
            <q-item clickable v-close-popup @click="onStatus(1)">
              <q-item-section>
                <q-item-label>Aktywne</q-item-label>
              </q-item-section>
            </q-item>

            <q-item clickable v-close-popup @click="onStatus(2)">
              <q-item-section>
                <q-item-label>W archiwum</q-item-label>
              </q-item-section>
            </q-item>

            <q-item clickable v-close-popup @click="onStatus(3)">
              <q-item-section>
                <q-item-label>Brak dostępnych produktów</q-item-label>
              </q-item-section>
            </q-item>
          </q-list>
          <q-tooltip>
            Status
          </q-tooltip>
        </q-btn-dropdown>
      </div>
    </div>
    <div
      class="q-table__container q-table--horizontal-separator column no-wrap q-table__card q-table--no-wrap no-shadow">
      <div class="q-table__middle scroll">
        <table class="q-table">
          <thead>
          <tr>
            <th class="text-right sortable">ID</th>
            <th class="text-right sortable">Tytuł</th>
            <th class="text-right sortable">Data dodania</th>
            <th class="text-right">Kategoria</th>
            <th class="text-right">Promocja</th>
            <th class="text-right">Cena</th>
            <th class="text-right">Ilość</th>
            <th class="text-right">Opcje</th>
          </tr>
          </thead>
          <tbody>
          <tr v-for="product in products">
            <td class="text-right">{{ product.id }}</td>
            <td class="text-right">{{ product.title }}</td>
            <td class="text-right">{{ product.created_at | moment('calendar') }}</td>
            <td class="text-right">{{ product.category.name }}</td>
            <td class="text-right"><span v-if="product.is_promo === 1">Tak</span><span v-else>Nie</span></td>
            <td class="text-right">{{product.price.price}}</td>
            <td v-if="product.is_no_limit_quantity !== 1" class="text-right" :class="product.quantity === 0 ? 'null-product' : ''"> {{ product.quantity }}</td>
            <td v-else class="text-right">Bez ograniczeń</td>
            <td class="text-right">
              <q-btn-dropdown label="Opcje" size="sm">
                <q-list>
                  <q-item clickable :to="{name: 'ProductShow', params: {id: product.id, title: product.title}}">
                    <q-item-section v-close-popup>
                      <q-item-label>Podejrzyj</q-item-label>
                    </q-item-section>
                  </q-item>
                  <q-item clickable :to="{name: 'EditProduct', params: {id: product.id, title: product.title}}">
                    <q-item-section v-close-popup>
                      <q-item-label>Edytuj</q-item-label>
                    </q-item-section>
                  </q-item>
                  <q-item clickable @click="archive(product.id)">
                    <q-item-section v-close-popup>
                      <q-item-label v-if="product.status !== 2">Przenieś do archiwum</q-item-label>
                      <q-item-label v-else>Usuń z archiwum</q-item-label>
                    </q-item-section>
                  </q-item>
                  <q-item clickable @click="remove(product.id)">
                    <q-item-section v-close-popup>
                      <q-item-label>Usuń na stałe</q-item-label>
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
    <q-dialog v-model="searchModal" :position="'top'">
      <q-card class="width-search-modal">
        <q-form @submit.prevent="loadProducts">
          <div class="row">
            <div class="col-xl-6 col-lg-6 col-md-6">
              <q-input type="text" v-model="params.title" placeholder="Wpisz tytuł ..."/>
            </div>
            <div class="col-xl-5 col-lg-5 col-md-5">
              <q-select
                v-model="params.category_id"
                :options="categories"
                option-label="name"
                option-value="id"
                option-disable="inactive"
                emit-value
                map-options
                label="Wybierz kategorię ..."
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
  export default {
    name: "ProductsList",
    data() {
      return {
        products: [],
        params: {
          title: '',
          category_id: '',
          is_promo: '',
          status: ''
        },
        title: 'Dodane produkty',
        searchModal: false,
        categories: []
      }
    },
    methods: {
      loadProducts() {
        this.$axios.get(`admin/products/get?title=${this.params.title}&category_id=${this.params.category_id}&is_promo=${this.params.is_promo}&status=${this.params.status}`)
          .then((data) => {
            this.products = data.data.data;
          })
          .catch(() => {
            this.$q.notify({
              message: 'Nie udało się załadować listy produktów'
            })
          })
      },
      remove(id) {
        this.$axios.delete(`admin/products/remove/${id}`)
          .then((data) => {
            if (data.data.success === 1) {
              this.$q.notify({
                message: 'Produkt zostal usunięty'
              });
              this.loadProducts();
            }
          })
          .catch(() => {
            this.$q.notify({
              message: 'Coś poszło nie tak'
            });
          })
      },
      loadDataCategories() {
        this.$axios.get('admin/categories/get')
          .then((data) => {
            this.categories = data.data.data;
          })
          .catch(() => {
            this.$q.notify({
              message: 'Nie udało się załadować listy kategorii'
            });
          })
      },
      archive(id) {
        this.$axios.post(`admin/products/archive/${id}`)
          .then((data) => {
            if (data.data.success === 1) {
              this.loadProducts();
              this.$q.notify({
                message: 'Operacja wykonana pomyślnie'
              })
            }
          })
          .catch(() => {
            this.$q.notify({
              message: 'Coś poszło nie tak'
            })
          })
      },
      onStatus(status) {
        this.params.status = status;
        this.loadProducts();
      }
    },
    created() {
      this.loadProducts();
      this.loadDataCategories();
    }
  }
</script>
