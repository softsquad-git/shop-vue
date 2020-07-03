<template>
<div class="container">
  <div class="ss-account-title">
    {{title}}
    <div class="float-right">
      <q-btn type="button" icon="clear" :to="{name: 'ProductsList'}" size="xs" round color="negative">
        <q-tooltip>
          Anuluj
        </q-tooltip>
      </q-btn>
    </div>
  </div>
  <q-form @submit.prevent="create">
    <div class="row">
      <div class="col-xl-8 col-lg-8 col-md-8">
        <q-input type="text" placeholder="Tytuł" v-model="data.title"/>
      </div>
      <div class="col-xl-4 col-lg-4 col-md-4">
        <q-select
          v-model="data.category_id"
          :options="categories"
          option-label="name"
          option-value="id"
          option-disable="inactive"
          emit-value
          map-options
          label="Kategoria"
        />
      </div>
    </div>
      <div class="row mt-20">
        <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-xs-12">
          <q-editor
            v-model="data.description"
            :dense="$q.screen.lt.md"
            class="full-width"
            :toolbar="[
        [
          {
            label: $q.lang.editor.align,
            icon: $q.iconSet.editor.align,
            fixedLabel: true,
            list: 'only-icons',
            options: ['left', 'center', 'right', 'justify']
          },
          {
            label: $q.lang.editor.align,
            icon: $q.iconSet.editor.align,
            fixedLabel: true,
            options: ['left', 'center', 'right', 'justify']
          }
        ],
        ['bold', 'italic', 'strike', 'underline', 'subscript', 'superscript'],
        ['token', 'hr', 'link', 'custom_btn'],
        ['print', 'fullscreen'],
        [
          {
            label: $q.lang.editor.formatting,
            icon: $q.iconSet.editor.formatting,
            list: 'no-icons',
            options: [
              'p',
              'h1',
              'h2',
              'h3',
              'h4',
              'h5',
              'h6',
              'code'
            ]
          },
          {
            label: $q.lang.editor.fontSize,
            icon: $q.iconSet.editor.fontSize,
            fixedLabel: true,
            fixedIcon: true,
            list: 'no-icons',
            options: [
              'size-1',
              'size-2',
              'size-3',
              'size-4',
              'size-5',
              'size-6',
              'size-7'
            ]
          },
          {
            label: $q.lang.editor.defaultFont,
            icon: $q.iconSet.editor.font,
            fixedIcon: true,
            list: 'no-icons',
            options: [
              'default_font',
              'arial',
              'arial_black',
              'comic_sans',
              'courier_new',
              'impact',
              'lucida_grande',
              'times_new_roman',
              'verdana'
            ]
          },
          'removeFormat'
        ],
        ['quote', 'unordered', 'ordered', 'outdent', 'indent'],

        ['undo', 'redo'],
        ['viewsource']
      ]"
            :fonts="{
        arial: 'Arial',
        arial_black: 'Arial Black',
        comic_sans: 'Comic Sans MS',
        courier_new: 'Courier New',
        impact: 'Impact',
        lucida_grande: 'Lucida Grande',
        times_new_roman: 'Times New Roman',
        verdana: 'Verdana'
      }"
          />
        </div>
      </div>
    <div class="row mt-20">
      <div class="col-xl-8 col-lg-8 col-md-8">
        <q-input type="textarea" v-model="data.min_description" placeholder="Krótki opis"/>
      </div>
      <div class="col-xl-4 col-lg-4 col-md-4">
        <q-input type="number" :disable="data.is_no_limit_quantity === true" v-model="data.quantity" placeholder="Ilość">
          <template v-slot:after>
            <q-checkbox keep-color v-model="data.is_no_limit_quantity" :label="data.is_no_limit_quantity === true ? 'Bez ograniczeń' : ''" class="mt-10" color="orange">
              <q-tooltip>
                Bez ograniczeń
              </q-tooltip>
            </q-checkbox>
          </template>
        </q-input>
        <q-input
          v-model="data.price"
          style="margin-top: 23px;"
          mask="#.#"
          fill-mask="0"
          label="Cena"
          reverse-fill-mask
        ></q-input>
      </div>
    </div>
    <div class="row mt-20">
      <div class="col-xl-3 col-lg-3 col-md-3">
        <q-checkbox keep-color v-model="data.is_promo" class="mt-10" label="Promocja" color="orange" />
      </div>
      <div class="col-xl-3 col-lg-3 col-md-3">
        <q-input v-if="data.is_promo"
          v-model="data.old_price"
          mask="#.#"
          fill-mask="0"
          label="Cena przed promocją"
          reverse-fill-mask
        ></q-input>
      </div>
      <div class="col-xl-3 col-lg-3 col-md-3">
        <q-input v-if="data.is_promo" v-model="data.start_promotion" label="Start promocji">
          <template v-slot:prepend>
            <q-icon name="event" class="cursor-pointer">
              <q-popup-proxy transition-show="scale" transition-hide="scale">
                <q-date v-model="data.start_promotion" mask="YYYY-MM-DD HH:mm" />
              </q-popup-proxy>
            </q-icon>
          </template>

          <template v-slot:append>
            <q-icon name="access_time" class="cursor-pointer">
              <q-popup-proxy transition-show="scale" transition-hide="scale">
                <q-time v-model="data.start_promotion" mask="YYYY-MM-DD HH:mm" format24h />
              </q-popup-proxy>
            </q-icon>
          </template>
        </q-input>
      </div>
      <div class="col-xl-3 col-lg-3 col-md-3">
        <q-input v-if="data.is_promo" v-model="data.end_promotion" label="Koniec promocji">
          <template v-slot:prepend>
            <q-icon name="event" class="cursor-pointer">
              <q-popup-proxy transition-show="scale" transition-hide="scale">
                <q-date v-model="data.end_promotion" mask="YYYY-MM-DD HH:mm" />
              </q-popup-proxy>
            </q-icon>
          </template>

          <template v-slot:append>
            <q-icon name="access_time" class="cursor-pointer">
              <q-popup-proxy transition-show="scale" transition-hide="scale">
                <q-time v-model="data.end_promotion" mask="YYYY-MM-DD HH:mm" format24h />
              </q-popup-proxy>
            </q-icon>
          </template>
        </q-input>
      </div>
    </div>
    <div class="row mt-20">
      <div class="col-xl-3 col-lg-3 col-md-4 col-sm-5 col-xs-12">
        <q-uploader
          label="Wybierz zdjęcia"
          flat
          :multiple="true"
          class="full-width"
          :factory="uploadFile"
          accept=".jpg, .png, .gif, image/*"
          ref="files">
        </q-uploader>
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
        name: "CreateProduct",
      data() {
          return{
            title: 'Dodaj produkt',
            categories: [],
            data: {
              title: '',
              category_id: '',
              description: '',
              min_description: '',
              quantity: '',
              old_price: '',
              price: 0,
              start_promotion: '',
              end_promotion: '',
              is_promo: false,
              is_no_limit_quantity: false,
              images: []
            },
          }
      },
      methods: {
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
        create() {
            this.data.images = this.$refs.files.files;
            if (this.data.images.length > 0) {
              let formData = new FormData();
              for (let i = 0; i < this.data.images.length; i++) {
                let image = this.data.images[i];
                formData.append('images[' + i + ']', image, image.name);
                formData.append('title', this.data.title);
                formData.append('category_id', this.data.category_id);
                formData.append('description', this.data.description);
                formData.append('old_price', this.data.old_price);
                formData.append('min_description', this.data.min_description);
                formData.append('quantity', this.data.quantity);
                formData.append('is_no_limit_quantity', this.data.is_no_limit_quantity);
                formData.append('price', this.data.price);
                formData.append('start_promotion', this.data.start_promotion);
                formData.append('end_promotion', this.data.end_promotion);
                formData.append('is_promo', this.data.is_promo);
              }
              this.saveData(formData)
            } else {
              this.saveData(this.data);
            }
        },
        saveData(data) {
            this.$axios.post('admin/products/store', data)
          .then((data) => {
            if (data.data.success === 1){
              this.$q.notify({
                message: 'Produkt został dodany'
              });
              this.$router.push({
                name: 'ProductsList'
              });
            }
          })
          .catch((error) => {
            this.$q.notify({
              message: 'Coś poszło nie tak'
            });
          })
        },
        uploadFile() {
          this.data.images = this.$refs.files.files;
        }
      },
      created() {
          this.loadDataCategories();
      }
    }
</script>
