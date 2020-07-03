<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          icon="menu"
          aria-label="Menu"
          @click="leftDrawerOpen = !leftDrawerOpen"
        />
        <q-toolbar-title>
          World Design
        </q-toolbar-title>
        <div>Michał Łosak</div>
      </q-toolbar>
    </q-header>

    <q-drawer
      v-model="leftDrawerOpen"
      show-if-above
      bordered
      content-class="bg-grey-1"
    >
      <q-list>
        <q-item-label
          header
          class="text-grey-8"
        >
          MENU
        </q-item-label>
      <admin-menu/>
      </q-list>
    </q-drawer>
    <q-page-container class="mt-40">
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
  import AdminMenu from "components/admin/AdminMenu";
  export default {
    name: 'AdminLayout',
    components: {AdminMenu},
    data () {
      return {
        leftDrawerOpen: false,
      }
    }
  }
</script>
