<template>
<div class="container">
  <div class="row">
    <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-xs-12">
      <q-form style="border: 0!important;" @submit.prevent="loadDataProducts">
        <div class="row padding-5">
          <div class="col-xl-4 col-lg-4 col-md-4 col-sm-4 col-xs-12">
            <q-input type="text" v-model="params.title" placeholder="Tytuł"/>
          </div>
          <div class="col-xl-3 col-lg-3 col-md-3 col-sm-3 col-xs-12">
            <q-select
              v-model="params.category_id"
              :options="categories"
              option-label="name"
              option-value="id"
              option-disable="inactive"
              emit-value
              map-options
              label="Kategoria"
            />
          </div>
          <div class="col-xl-3 col-lg-3 col-md-3 col-sm-3 col-xs-12">
            <q-select
              v-model="params.is_promo"
              :options="isPromotion"
              option-label="t"
              option-value="v"
              option-disable="inactive"
              emit-value
              map-options
              label="W promocji"
            />
          </div>
          <div class="col-xl-2 col-lg-2 col-md-2 col-sm-2 col-xs-12">
            <q-btn type="submit"
                   size="md"
                   class="full-width"
                   flat
                   style="padding-top: 12px;"
                   icon="search">
              Szukaj
            </q-btn>
          </div>
        </div>
      </q-form>
    </div>
    <div v-for="product in products" class="col-xl-3 col-lg-3 col-md-3 col-sm-4 col-xs-12 p-10">
      <q-card class="my-card">
        <q-img :src="product.image" :alt="product.title" />

        <q-card-section>
          <q-btn
            fab
            color="primary"
            icon="add_shopping_cart"
            class="absolute"
            style="top: 0; right: 12px; transform: translateY(-50%);"
          />

          <div class="row no-wrap items-center">
            <div class="col text-h6 ellipsis">
              <router-link :to="{name: 'fProductShow', params: {title: product.title, id: product.id}}"> {{ product.title }} </router-link>
            </div>
          </div>
          <div class="row no-wrap items-center">
            <div class="col-auto text-grey text-caption q-pt-md row no-wrap" style="text-align: right">
              <router-link to="#"><q-icon name="place"></q-icon> {{ product.category.name }}</router-link>
            </div>
          </div>
        </q-card-section>

        <q-card-section class="q-pt-none">
          <div class="text-subtitle1">
            <span v-if="product.is_promo === 1">
              <s>{{ product.price.old_price }}</s> {{ product.price.price }}
            </span>
            <span v-else>
              {{ product.price.price }}
            </span>
          </div>
        </q-card-section>
      </q-card>
    </div>
  </div>
</div>
</template>

<script>
  export default {
    name: "fProductsList",
    data() {
      return {
        products: [],
        title: 'Lista produktów',
        params: {
          title: '',
          category_id: '',
          is_promo: ''
        },
        isPromotion: [
          {v: 1, t: 'Tak'},
          {v: 0, t: 'Nie'}
        ],
        categories: []
      }
    },
    methods: {
      loadDataProducts() {
        this.$axios.get(`products/get?title=${this.params.title}&category_id=${this.params.category_id}&is_promo=${this.params.is_promo}`)
          .then((data) => {
            this.products = data.data.data;
          })
          .catch(() => {
            this.$q.notify({
              message: 'Nie udało się załadować listy produktów'
            })
          })
      },
      loadDataCategories() {
        this.$axios.get('categories')
        .then((data) => {
          this.categories = data.data.data;
        })
        .catch(() => {
          this.$q.notify({
            message: 'Nie udało się załadować listy kategorii'
          })
        })
      }
    },
    created() {
      this.loadDataProducts();
      this.loadDataCategories();
    }
  }
</script>
