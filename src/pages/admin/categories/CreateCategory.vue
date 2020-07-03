<template>
  <div class="container">
    <div class="ss-account-title">
      {{title}}
      <div class="float-right">
        <q-btn type="button" icon="clear" :to="{name: 'CategoriesList'}" size="xs" round color="negative">
          <q-tooltip>
            Anuluj
          </q-tooltip>
        </q-btn>
      </div>
    </div>
    <q-form @submit.prevent="create">
      <div class="row">
        <div class="col-xl-4 col-lg-4 col-md-4 col-sm-6 col-xs-12">
          <q-input type="text" placeholder="Nazwa" v-model="data.name"/>
        </div>
        <div class="col-xl-4 col-lg-4 col-md-4 col-sm-6 col-xs-12">
          <q-input type="text" placeholder="Alias" v-model="data.alias"/>
        </div>
        <div class="col-xl-4 col-lg-4 col-md-4 col-sm-12 col-xs-12">
          <q-select
            v-model="data.parent_id"
            :options="categories"
            option-label="name"
            option-value="id"
            option-disable="inactive"
            emit-value
            map-options
            label="Kategoria nadrzędna"
          />
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
    name: "CreateCategory",
    data() {
      return {
        title: 'Dodaj kategorię',
        data: {
          name: '',
          alias: '',
          parent_id: ''
        },
        categories: []
      }
    },
    methods: {
      loadParentsCategories() {
        this.$axios.get('admin/categories/get')
          .then((data) => {
            this.categories = data.data.data;
          })
          .catch(() => {
            this.$q.notify({
              message: 'Nie udało się załadować kategorii które mogą być kategorą nadrzędną'
            })
          })
      },
      create() {
        this.$axios.post('admin/categories/store', this.data)
          .then((data) => {
            if (data.data.success === 1) {
              this.$q.notify({
                message: 'Kategoria została dodana'
              });
              this.loadParentsCategories();
              this.data.name = '';
              this.data.alias = '';
              this.data.parent_id = '';
            } else {
              this.$q.notify({
                message: data.data.msg
              })
            }
          })
          .catch((error) => {
            //
          })
      }
    },
    created() {
      this.loadParentsCategories();
    }
  }
</script>
