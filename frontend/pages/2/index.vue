<template lang="pug">
  div
    nuxt-content(:document="document")
    v-btn(@click="action") Отпарвить данные
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  name: "task-2",
  async asyncData({ $content }) {
    const document = await $content('task-2').fetch()

    return { document }
  },
  methods: {
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
