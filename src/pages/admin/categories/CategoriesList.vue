<template>
  <div class="p-10">
    <div class="ss-account-title">
      {{title}}
      <div class="float-right">
        <q-btn type="button" :to="{name: 'CreateCategory'}" icon="add" size="xs" round color="positive">
          <q-tooltip>
            Dodaj kategorię
          </q-tooltip>
        </q-btn>
        <q-btn type="button" @click="searchModal = true" class="ml-5" icon="search" size="xs" round>
          <q-tooltip>
            Szukaj
          </q-tooltip>
        </q-btn>
      </div>
    </div>
    <q-list dense padding class="rounded-borders">
     <div v-for="category in categories">
       <q-item clickable v-ripple style="margin-top: 10px;margin-bottom: 10px;">
         <q-item-section>
           <q-item-label>{{ category.name }}</q-item-label>
           <q-item-label caption>{{ category.alias }}</q-item-label>
         </q-item-section>
         <q-item-section side>
           <q-fab color="primary" push padding="xs" icon="keyboard_arrow_left" direction="left">
             <q-fab-action padding="xs" color="negative" @click="onClickRemove(category.id)" icon="delete"/>
             <q-fab-action padding="xs" color="warning" @click="onClickEdit(category)" icon="edit"/>
           </q-fab>
         </q-item-section>
       </q-item>
       <q-item v-if="category.children.length > 0" v-for="ch in category.children" class="ml-20" clickable v-ripple style="margin-top: 10px;margin-bottom: 10px;">
         <q-item-section>
           <q-item-label>{{ ch.name }}</q-item-label>
           <q-item-label caption>{{ ch.alias }}</q-item-label>
         </q-item-section>
         <q-item-section side>
           <q-fab color="primary" push padding="xs" icon="keyboard_arrow_left" direction="left">
             <q-fab-action padding="xs" color="negative" @click="onClickRemove(category.id)" icon="delete"/>
             <q-fab-action padding="xs" color="warning" @click="onClickEdit(category)" icon="edit"/>
           </q-fab>
         </q-item-section>
       </q-item>
     </div>
    </q-list>
    <edit-category ref="editCategory"/>
    <q-dialog v-model="searchModal" :position="'top'">
      <q-card class="width-search-modal">
        <q-form @submit.prevent="loadCategoriesItems">
          <div class="row">
            <div class="col-xl-11 col-lg-11 col-md-11">
              <q-input type="text" v-model="params.name" placeholder="Nazwa kategorii ..."/>
            </div>
            <div class="col-xl-1 col-lg-1 col-md-1">
              <q-btn type="submit" flat icon="search" class="full-width mt-10"/>
            </div>
          </div></q-form>
      </q-card>
    </q-dialog>
  </div>
</template>

<script>
  export default {
    name: "CategoriesList",
    components: {EditCategory: () => import('pages/admin/categories/EditCategory.vue')},
    data() {
      return {
        title: 'Lista kategorii',
        categories: [],
        params: {
          name: ''
        },
        searchModal: false
      }
    },
    methods: {
      loadCategoriesItems() {
        this.$axios.get(`admin/categories/items?name=${this.params.name}`)
          .then((data) => {
            this.categories = data.data.data;
          })
          .catch(() => {
            this.$q.notify({
              message: 'Nie udało się załadować listy kategorii'
            });
          })
      },
      onClickRemove(id) {
        this.$axios.delete(`admin/categories/remove/${id}`)
          .then((data) => {
            if (data.data.success === 1) {
              this.loadCategoriesItems();
              this.$q.notify({
                message: 'Kategoria została usunięta'
              })
            } else {
              this.$q.notify({
                message: data.data.msg
              })
            }
          })
          .catch(() => {
            this.$q.notify({
              message: 'Coś poszło nie tak'
            })
          })
      },
      onClickEdit(category) {
        this.$refs.editCategory.openModal(category);
      }
    },
    created() {
      this.loadCategoriesItems();
    }
  }
</script>
