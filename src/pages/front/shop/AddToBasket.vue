<template>
  <q-form @submit.prevent="add" style="border:0;padding: 0">
    <div class="row">
      <div class="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-xs-12">
        <number-input v-if="product.is_no_limit_quantity !== 1" controls :min="1" :max="product.quantity" style="border-radius: 0;"/>
        <number-input v-else controls placeholder="Ilość" :min="1" style="border-radius: 0"/>
      </div>
      <div class="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-xs-12">
        <q-btn flat style="padding: 2px; border-radius: 0;" color="red" class="full-width" type="submit" icon="add_shopping_cart" outline label="Dodaj do koszyka"/>
      </div>
    </div>
  </q-form>
</template>

<script>
  export default {
    name: "AddToBasket",
    data() {
      return {
        modal: false,
        product: {},
        data: {
          quantity: 1
        }
      }
    },
    props: {
      product: {}
    },
    methods: {
      add() {
        //
      }
    }
  }
</script>
