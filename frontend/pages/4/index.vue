<template lang="pug">
  nuxt-content(:document="document")
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  name: "task-4",
  async asyncData({ $content }) {
    const document = await $content('task-4').fetch()

    return { document }
  },
})
</script>
