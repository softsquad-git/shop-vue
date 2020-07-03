<template>
  <q-layout view="hHh lpR fFf">

    <q-header elevated class="bg-white text-dark" height-hint="98">
      <q-toolbar>
        <q-toolbar-title>
          <q-btn type="button" flat dense icon="face" round>
            <q-tooltip>
              Konto
            </q-tooltip>
          </q-btn>
          <q-btn type="button" flat dense icon="shopping_basket" round>
            <q-tooltip>
              Koszyk
            </q-tooltip>
          </q-btn>
        </q-toolbar-title>

        <q-btn dense flat round icon="menu" @click="right = !right" />
      </q-toolbar>
    </q-header>

    <q-drawer v-model="right" side="right" bordered>
      <q-list class="mt-10">
        <q-item :to="{name: 'HomePage'}" clickable v-ripple>
          <q-item-section>Strona główna</q-item-section>
          <q-item-section avatar>
            <q-icon color="primary" name="house" />
          </q-item-section>
        </q-item>
        <q-item :to="{name: 'fProductsList'}" clickable v-ripple>
          <q-item-section>Produkty</q-item-section>
          <q-item-section avatar>
            <q-icon color="primary" name="apps" />
          </q-item-section>
        </q-item>
        <q-item-label header>Lista kategorii</q-item-label>
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>

  </q-layout>
</template>

<script>

export default {
  name: 'MainLayout',

  data () {
    return {
      right: false
    }
  }
}
</script>
