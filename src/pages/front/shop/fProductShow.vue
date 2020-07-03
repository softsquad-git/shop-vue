<template>
  <div class="container shadow-2 mt-40 p-10">
    <div class="row">
      <div class="col-xl-7 col-lg-7 col-md-7 col-sm-6 col-xs-12">
        <viewer :images="product.images">
          <div class="row" style="padding: 0 10px;">
            <div class="col-xl-4 col-lg-4 col-md-4 col-sm-5 col-xs-6 padding-5" v-for="image in product.images"
                 :key="image.src">
              <div class="images">
                <img class="full-width posts-group-content-img" :alt="image.src" :src="image.src"/>
              </div>
            </div>
          </div>
        </viewer>
      </div>
      <div class="col-xl-5 col-lg-5 col-md-5 col-sm-6 col-xs-12">
        <div class="f-product-sidebar">
          <h3 class="product-title">{{product.title}}</h3>
          <add-to-basket :product="product"/>
          <br/>
          <q-btn @click="sendMessage" flat icon="mail_outline" size="sm" class="mt-10" label="Napisz wiadomość"/>
          <q-btn :to="{name: 'fProductsInCategory', params: {alias: product.category.alias}}" flat icon="label_outline" size="sm" class="mt-10" :label="'Więcej w:' + product.category.name"/>
          <div class="price">
          <span v-if="product.is_promo === 1">
            <s>{{ product.price.old_price }}</s> {{ product.price.price }} zł
          </span>
            <span v-else>
            {{ product.price.price }} zł
          </span>
          </div>
          <div class="min-desc">
            <div class="product-content-title">
              Podstawowe informacje
            </div>
            <p v-if="product.min_description" v-html="product.min_description"></p>
            <p v-else>Nie dodano</p>
          </div>
        </div>
      </div>
    </div>
    <div class="row">
      <div class="col-xl-12 col-lg-12 col-md-12 col-xs-12 p-10">
        <div class="min-desc">
          <div class="product-content-title">
            Opis produktu
          </div>
          <p v-if="product.description" v-html="product.description"></p>
          <p v-else>Nie dodano</p>
        </div>
      </div>
    </div>
    <sent-message ref="send_message"/>
  </div>
</template>

<script>
  import 'viewerjs/dist/viewer.css'
  import Viewer from 'v-viewer'
  import Vue from 'vue'

  Vue.use(Viewer)
  export default {
    name: "fProductShow",
    components: {
      SentMessage: () => import('pages/front/shop/SentMessage.vue'),
      AddToBasket: () => import('pages/front/shop/AddToBasket.vue'),
    },
    data() {
      return {
        product: {},
        classCSS1: 'col-xl-6 col-lg-6 col-md-6',
        classCSS2: 'col-xl-12 col-lg-12 col-md-12 col-sm-12 col-xs-12'
      }
    },
    methods: {
      loadDataProduct() {
        let id = this.$route.params.id;
        this.$axios.get(`products/find/${id}`)
          .then((data) => {
            this.product = data.data.data
          })
          .catch(() => {
            this.$q.notify({message: 'Nie można załadować danych produktu'})
          })
      },
      addToBasket() {
        this.$refs.addBasket.openModal(this.product);
      },
      sendMessage() {
        this.$refs.send_message.openModal(this.$route.params.id);
      }
    },
    created() {
      this.loadDataProduct();
    }
  }
</script>
