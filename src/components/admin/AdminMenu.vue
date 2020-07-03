<template>
    <div>
      <q-btn flat icon="shop" label="Produkty" class="text-weight-300">
        <q-menu fit>
          <q-list style="min-width: 100px">
            <q-item :to="{name: 'ProductsList'}" clickable>
              <q-item-section>Lista </q-item-section>
            </q-item>
            <q-item :to="{name: 'CreateProduct'}" clickable>
              <q-item-section>Dodaj </q-item-section>
            </q-item>
          </q-list>
        </q-menu>
      </q-btn>
      <br/>
      <q-btn flat icon="category" label="Kategorie" class="text-weight-300 mt-10">
        <q-menu fit>
          <q-list style="min-width: 100px">
            <q-item :to="{name: 'CategoriesList'}" clickable>
              <q-item-section>Lista </q-item-section>
            </q-item>
            <q-item :to="{name: 'CreateCategory'}" clickable>
              <q-item-section>Dodaj </q-item-section>
            </q-item>
          </q-list>
        </q-menu>
      </q-btn>
      <br/>
      <q-btn flat icon="local_shipping" label="Wysyłka" class="text-weight-300 mt-10">
        <q-menu fit>
          <q-list style="min-width: 100px">
            <q-item :to="{name: 'ShipmentsList'}" clickable>
              <q-item-section>Lista </q-item-section>
            </q-item>
            <q-item :to="{name: 'CreateShipment'}" clickable>
              <q-item-section>Dodaj </q-item-section>
            </q-item>
          </q-list>
        </q-menu>
      </q-btn>
      <br/>
      <q-btn :to="{name: 'OrdersList'}" flat icon="shopping_basket" label="Zamowienia" class="text-weight-300 mt-10"/>
      <q-btn :to="{name: 'UsersList'}" flat icon="supervised_user_circle" label="Użytkownicy" class="text-weight-300 mt-10"/>
      <q-btn flat icon="settings" label="Ustawienia" class="text-weight-300 mt-10"/>
    </div>
</template>

<script>
    export default {
        name: "AdminMenu"
    }
</script>
