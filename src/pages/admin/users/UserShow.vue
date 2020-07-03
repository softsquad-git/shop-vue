<template>
  <q-dialog v-model="modal" persistent>
    <q-card style="min-width: 350px">
      <q-card-section>
        <div class="text-h6">{{user.s.name}} {{ user.s.last_name }}</div>
      </q-card-section>

      <q-card-section class="q-pt-none">
        <div
          class="q-table__container q-table--horizontal-separator column no-wrap q-table__card q-table--no-wrap no-shadow">
          <div class="q-table__middle scroll">
            <table class="q-table">
              <tbody>
              <tr>
                <td class="text-right">Imię & Nazwisko</td>
                <td class="text-right">{{ user.s.name + ' ' + user.s.last_name }}</td>
              </tr>
              <tr>
                <td class="text-right">Data rejestracji</td>
                <td class="text-right">{{ user.created_at | moment('calendar') }}</td>
              </tr>
              <tr>
                <td class="text-right">Adres e-mail</td>
                <td class="text-right">{{ user.email }}</td>
              </tr>
              <tr>
                <td class="text-right">Adres zamieszkania</td>
                <td class="text-right">{{ user.s.location ? user.s.location : 'Nie dodano' }}</td>
              </tr>
              <tr>
                <td class="text-right">Płeć</td>
                <td class="text-right">{{ user.s.sex ? checkSex(user.s.sex) : 'Nie dodano' }}</td>
              </tr>
              <tr>
                <td class="text-right">Telefon</td>
                <td class="text-right">{{ user.s.contact_phone ? user.s.contact_phone : 'Nie dodano' }}</td>
              </tr>
              </tbody>
            </table>
          </div>
        </div>
      </q-card-section>

      <q-card-actions align="right" class="text-primary">
        <q-btn flat size="sm" label="Zamknij" v-close-popup/>
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script>
    export default {
        name: "UserShow",
      data() {
          return {
            modal: false,
            user: {}
          }
      },
      methods: {
          openModal(id) {
            this.$axios.get(`admin/users/find/${id}`)
            .then((data) => {
              this.modal = true;
              this.user = data.data.data;
            })
            .catch(() => {
              this.$q.notify({
                message: 'Nie udało się załadować danych użytkownika'
              })
            })
          },
        checkSex(sex) {
            if (sex === 1) {
              return 'Kobieta'
            } else {
              return 'Mężczyzna'
            }
        }
      }
    }
</script>
