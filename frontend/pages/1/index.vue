<template lang="pug">
  div.task-1
    nuxt-content(:document="document").mb-5
    v-card.pa-3
      div(
        v-for="(values, index) in demoValues"
        :key="'demo' + index"
      ).d-flex
        div.func balance
        div (
        v-text-field(
          v-model="values[0]"
          hide-details
        )
        div.synt ,
        v-text-field(
          v-model="values[1]"
          hide-details
        )
        div )
        div.comment.ml-2 // {{ balance(...values) }}
</template>

<script lang="ts">
import Vue from 'vue'
import { balance } from "~/assets/util"

export default Vue.extend({
  name: "task-1",
  data() {
    return {
      demoValues: [
        ['!!', '??'], // Right
        ['!??', '?!!'], // Left
        ['!?!!', '?!?'], // Left
        ['!!???!????', '??!!?!!!!!!!'], // Balance
      ]
    }
  },
  async asyncData({ $content }) {
    const document = await $content('task-1').fetch()

    return { document }
  },
  methods: {
    balance
  }
})
</script>

<style lang="sass" scoped>
.func
  color: #DF8B3E
.synt
  color: #A84D2C
.comment
  color: #698556
</style>

<style lang="sass">
.task-1
  .v-text-field
    max-width: 5.5rem
    margin: 0
    padding: 0
    display: flex
    align-items: center
    input
      padding: 0
      height: 18px
</style>
