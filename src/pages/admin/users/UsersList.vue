<template>
  <div class="p-10">
    <div class="ss-account-title">
      {{title}}
      <div class="float-right">
        <q-btn @click="searchModal = true" type="button" icon="search" size="xs" round>
          <q-tooltip>
            Szukaj
          </q-tooltip>
        </q-btn>
      </div>
    </div>
    <div
      class="q-table__container q-table--horizontal-separator column no-wrap q-table__card q-table--no-wrap no-shadow">
      <div class="q-table__middle scroll">
        <table class="q-table">
          <thead>
          <tr>
            <th class="text-right sortable">ID</th>
            <th class="text-right sortable">Imię i nazwisko</th>
            <th class="text-right sortable">Data rejestracji</th>
            <th class="text-right">nick</th>
            <th class="text-right">Opcje</th>
          </tr>
          </thead>
          <tbody>
          <tr v-for="user in users">
            <td class="text-right">{{ user.id }}</td>
            <td class="text-right">{{ user.name }}</td>
            <td class="text-right">{{ user.created_at | moment('calendar') }}</td>
            <td class="text-right">{{ user.nick ? user.nick : 'Nie dodano' }}
            </td>
            <td class="text-right">
              <q-btn-dropdown label="Opcje" size="sm">
                <q-list>
                  <q-item clickable @click="showData(user.id)">
                    <q-item-section v-close-popup>
                      <q-item-label>Zobacz dane</q-item-label>
                    </q-item-section>
                  </q-item>
                  <q-item clickable @click="showOrder(user.id)">
                    <q-item-section v-close-popup>
                      <q-item-label>Zamówienia</q-item-label>
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
    <user-show ref="userShowData"/>
    <q-dialog v-model="searchModal" :position="'top'">
      <q-card class="width-search-modal">
        <q-form @submit.prevent="loadDataUsers">
          <div class="row">
            <div class="col-xl-11 col-lg-11 col-md-11">
              <q-input type="text" v-model="params.name" placeholder="Imię | Nazwisko"/>
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
  import UserShow from "pages/admin/users/UserShow";
  export default {
    name: "UsersList",
    components: {UserShow},
    data() {
      return {
        title: 'Lista użytkowników',
        users: [],
        params: {
          name: ''
        },
        searchModal: false
      }
    },
    methods: {
      loadDataUsers() {
        this.$axios.get(`admin/users/get?name=${this.params.name}`)
          .then((data) => {
            this.users = data.data.data;
          })
          .catch(() => {
            this.$q.notify({
              message: 'Nie udało się załadować listy użytkowników'
            })
          })
      },
      showData(id) {
        this.$refs.userShowData.openModal(id);
      },
      showOrder(id) {

      }
    },
    created() {
      this.loadDataUsers();
    }
  }
</script>
