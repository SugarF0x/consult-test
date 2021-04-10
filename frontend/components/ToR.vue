<template lang="pug">
  nuxt-content(:document="document")
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  name: "TK",
  props: {
    doc: String
  },
  data() {
    return {
      document: null as any
    }
  },
  async fetch() {
    this.document = await this.$content(this.doc).fetch()
  },
})
</script>

<style lang="sass" scoped>

</style>
