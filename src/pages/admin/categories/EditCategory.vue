<template>
  <q-dialog v-model="modal" persistent>
    <q-card style="min-width: 350px">
      <q-card-section>
        <div class="text-h6">Zmień dane kategorii</div>
      </q-card-section>

      <q-card-section class="q-pt-none">
        <q-form @submit.prevent="update">
          <q-input type="text" placeholder="Nazwa kategorii" v-model="data.name"/>
          <q-input type="text" placeholder="Alias" v-model="data.alias" class="mt-10"/>
          <q-select
            v-model="data.category_id"
            :options="categories"
            class="mt-10"
            option-label="name"
            option-value="id"
            option-disable="inactive"
            emit-value
            map-options
            label="Kategoria nadrzędna"
          />
          <q-btn type="submit" size="md" class="mt-30">Zapisz</q-btn>
        </q-form>
      </q-card-section>

      <q-card-actions align="right" class="text-primary">
        <q-btn flat size="sm" label="Anuluj" v-close-popup/>
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script>
  export default {
    name: "EditCategory",
    data() {
      return {
        modal: false,
        data: {
          id: '',
          name: '',
          alias: '',
          parent_id: ''
        },
        categories: []
      }
    },
    methods: {
      openModal(category) {
        this.loadParentsCategories();
        this.data.id = category.id;
        this.data.name = category.name;
        this.data.alias = category.alias;
        this.data.parent_id = category.parent_id;
        this.modal = true;
      },
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
      update() {
        this.$axios.put(`admin/categories/update/${this.data.id}`, this.data)
          .then((data) => {
            if (data.data.success === 1) {
              this.modal = false;
              this.$q.notify({
                message: 'Dane kategorii zostały zmienione'
              });
            } else {
              this.$q.notify({
                message: data.data.msg
              });
            }
          })
          .catch((error) => {
            this.$q.notify({
              message: 'Coś poszło nie tak'
            });
          })
      }
    }
  }
</script>
