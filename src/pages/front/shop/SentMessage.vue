<template>
  <q-dialog v-model="modal" :position="'right'">
    <q-card style="width: 350px">
      <q-card-section>
        <div class="text-h6 ml-10">Wyślij wiadomość</div>
      </q-card-section>
      <q-card-section class="row items-center no-wrap">
        <q-form @submit.prevent="sent" style="border: 0" class="full-width">
          <div class="row">
           <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-xs-12">
             <q-input type="email" placeholder="E-mail" v-model="data.email"/>
           </div>
          </div>
          <div class="row">
            <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-xs-12">
              <q-input type="textarea" placeholder="Wiadomość" v-model="data.message"/>
            </div>
          </div>
          <div class="row mt-10">
            <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-xs-12">
              <q-btn type="submit" label="Wyślij"/>
            </div>
          </div>
        </q-form>
      </q-card-section>
    </q-card>
  </q-dialog>
</template>

<script>
    export default {
        name: "SentMessage",
      data() {
          return {
            modal: false,
            data: {
              email: '',
              message: '',
              product_id: ''
            }
          }
      },
      methods: {
          openModal(id) {
            this.data.parent_id = id;
            this.modal = true;
          },
        sent() {

        }
      }
    }
</script>
