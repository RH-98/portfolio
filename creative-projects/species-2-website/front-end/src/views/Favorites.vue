<template>
<div class="wrapper">
  <FavoriteList />
</div>
</template>

<script>
import FavoriteList from "../components/FavoriteList.vue"
export default {
  name: 'Favorite',
  components: {
      FavoriteList
  }
}
</script>
