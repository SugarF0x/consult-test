<template lang="pug">
  div
    nuxt-content(:document="document")
    Card.ma-5(
      v-for="entry in entries"
      :key="entry.id"
      :entry="entry"
    )
    Card.ma-5(
      fresh
      @success="addNewEntry"
    )
</template>

<script lang="ts">
import Vue from 'vue'
import { Entry } from "~/assets/interfaces"

export default Vue.extend({
  name: "task-2",
  async asyncData({ $content, $axios }) {
    const document = await $content('task-2').fetch()
    const entries = await $axios.$get('/api/cards')

    return { document, entries }
  },
  data() {
    return {
      entries: [] as Entry[]
    }
  },
  methods: {
    addNewEntry(entry: Entry) { this.entries.push(entry) },
    async action() {
      let response = await this.$axios.post('http://localhost:1337/cards', {
        "lastName": "Пельш",
        "firstName": "Борис",
        "phones": [
          123,
          '321',
          'asdasd'
        ]
      })

      console.log(response)
    }
  },
})
</script>

<style lang="sass" scoped>

</style>
