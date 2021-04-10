<template lang="pug">
  nuxt-content(:document="document")
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  name: "index",
  async asyncData({ $content }) {
    const document = await $content('home').fetch()

    return { document }
  },
})
</script>

<style lang="sass" scoped>

</style>
