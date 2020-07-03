<template>
  <viewer :images="images">
    <div class="row" style="padding: 0 10px;">
      <div class="col-xl-2 col-lg-2 col-md-3 col-sm-3 col-xs-6 padding-5" v-for="image in images" :key="image.src">
        <div class="images">
          <img class="full-width posts-group-content-img" :alt="image.src" :src="image.src"/>
        </div>
      </div>
    </div>
  </viewer>
</template>

<script>
  import 'viewerjs/dist/viewer.css'
  import Viewer from 'v-viewer'
  import Vue from 'vue'

  Vue.use(Viewer)
  export default {
    name: "ImagesProduct",
    props: {
      images: []
    }
  }
</script>
