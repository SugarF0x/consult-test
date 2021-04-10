<template lang="pug">
  ToR(:doc="$options.name")
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  name: "task-1",
  methods: {
    balance(left: string, right: string) {
      const EXCLAIM_WEIGHT = 2
      const QUESTION_WEIGHT = 3

      function calculateWeight(str: string): number {
        const exclaimsWeight = (str.match(/!/g)?.length || 0) * EXCLAIM_WEIGHT
        const questionWeight = (str.match(/\?/g)?.length || 0) * QUESTION_WEIGHT

        return exclaimsWeight + questionWeight
      }

      const leftWeight = calculateWeight(left)
      const rightWeight = calculateWeight(right)

      if (leftWeight > rightWeight) return 'Left'
      if (leftWeight < rightWeight) return 'Right'
      return 'Balance'
    }
  },
  mounted() {
    console.log(this.balance("!!","??")) // Right
    console.log(this.balance("!??","?!!")) // Left
    console.log(this.balance("!?!!","?!?")) // Left
    console.log(this.balance("!!???!????","??!!?!!!!!!!")) // Balance
  }
})
</script>

<style lang="sass" scoped>

</style>
