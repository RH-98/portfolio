<template>
<div class="details">
  <Details />
</div>
</template>

<script>
import Details from "../components/Details.vue"
export default {
  name: 'Animal',
  components: {
    Details
  },
}
</script>

<style scoped>

.details {
    display: flex;
    align-items: center;
    justify-content: center;
}

</style>