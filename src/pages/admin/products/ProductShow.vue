<template>
  <div class="container">
    <q-btn :to="{name: 'EditProduct', params: {id: product.id, title: product.title}}"
           class="float-right" icon="edit" round color="warning" size="xs">
      <q-tooltip>
        Edytuj
      </q-tooltip>
    </q-btn>
    <div class="row">
      <div class="col-xl-4 col-lg-4 col-md-4 col-sm-12 col-xs-12 p-10">
        <div class="ss-show-acc--product-title">
          Zdjęcie główne produktu
        </div>
        <q-img class="full-width" :src="product.image" alt="top-image"/>
      </div>
      <div class="col-xl-8 col-lg-8 col-md-8 col-sm-12 col-xs-12 p-10">
        <div class="ss-show-acc--product-title">
          Galeria produktu
        </div>
        <images-product :images="product.images" v-if="product.images.length > 0"/>
      </div>
    </div>
    <div class="row mt-20">
      <div class="col-xl-8 col-lg-8 col-md-8 col-sm-12 col-xs-12 p-10">
        <div class="ss-show-acc--product-title">
          Opis produktu
        </div>
        <p v-html="product.description"/>
      </div>
      <div class="col-xl-4 col-lg-4 col-md-4 col-sm-12 col-xs-12 p-10">
        <div class="ss-show-acc--product-title">
          Krótki opis produktu
        </div>
        <p v-html="product.min_description"/>
      </div>
    </div>
    <div class="row mt-20">
      <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-xs-12">
        <div class="ss-show-acc--product-title">
          Informacje o produkcie
        </div>
        <div
          class="q-table__container q-table--horizontal-separator column no-wrap q-table__card q-table--no-wrap no-shadow">
          <div class="q-table__middle scroll">
            <table class="q-table">
              <tbody>
              <tr>
                <td class="text-center">Tytuł</td>
                <td class="text-left">{{ product.title }}</td>
              </tr>
              <tr>
                <td class="text-center">Kategoria</td>
                <td class="text-left">{{ product.category.name }}</td>
              </tr>
              <tr>
                <td class="text-center">Data dodania</td>
                <td class="text-left">{{ product.created_at | moment('calendar') }}</td>
              </tr>
              <tr>
                <td class="text-center">Ilość</td>
                <td class="text-left">{{ product.quantity }}</td>
              </tr>
              <tr>
                <td class="text-center">Promocja</td>
                <td class="text-left"><span v-if="product.is_promo === 1">Tak</span><span v-else>Nie</span></td>
              </tr>
              <tr v-if="product.is_promo === 1">
                <td class="text-center">Start promocji</td>
                <td class="text-left">{{ product.price.start_promotion }}</td>
              </tr>
              <tr v-if="product.is_promo === 1">
                <td class="text-center">Koniec promocji</td>
                <td class="text-left">{{ product.price.end_promotion }}</td>
              </tr>
              <tr v-if="product.is_promo === 1">
                <td class="text-center">Poprzednia cena</td>
                <td class="text-left">{{ product.price.old_price }}</td>
              </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import ImagesProduct from "pages/admin/products/ImagesProduct";
  export default {
    name: "ProductShow",
    components: {ImagesProduct},
    data() {
      return {
        product: null
      }
    },
    methods: {
      loadDataProduct() {
        this.$axios.get(`admin/products/find/${this.$route.params.id}`)
          .then((data) => {
            this.product = data.data.data;
          })
          .catch(() => {
            this.$q.notify({
              message: 'Nie udało się załadować danych produktu'
            })
          })
      }
    }, created() {
      this.loadDataProduct();
    }
  }
</script>
