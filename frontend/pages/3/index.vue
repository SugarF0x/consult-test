<template lang="pug">
  div
    ToR(:doc="$options.name")
    v-row(justify="center")
      v-col(cols="12" sm="6")
        v-card
          v-card-title.justify-center Время
          v-card-text.headline.text-center {{ formattedTime }}
          v-card-actions
            v-btn(
              :disabled="selectedTimezone === 'Europe/Moscow'"
              @click="switchTimezone"
              color="primary"
            ) Москва
            v-spacer
            v-btn(
              :disabled="selectedTimezone === 'America/New_York'"
              @click="switchTimezone"
              color="primary"
            ) Нью-Йорк
</template>

<script lang="ts">
import Vue from 'vue'
import { intlFormat } from 'date-fns'
import { utcToZonedTime } from 'date-fns-tz'

export default Vue.extend({
  name: "task-3",
  async fetch() {
    this.time = new Date((await this.$axios.$get('api/timezone/Europe/Moscow')).utc_datetime)
  },
  data() {
    return {
      time: new Date(),
      updateInterval: null as null | NodeJS.Timeout,

      formattedTime: '00:00:00',
      selectedTimezone: 'Europe/Moscow',
    }
  },
  methods: {
    formatTime() {
      this.formattedTime = intlFormat(
        utcToZonedTime(this.time, this.selectedTimezone),
        { hour: '2-digit', minute: '2-digit', second: '2-digit' }
      )
    },
    switchTimezone() {
      if (this.selectedTimezone === 'America/New_York') this.selectedTimezone = 'Europe/Moscow'
      else this.selectedTimezone = 'America/New_York'
      this.formatTime()
    }
  },
  mounted() {
    this.formatTime()
    this.updateInterval = setInterval(() => {
      this.time.setTime(this.time.getTime() + 1000)
      this.formatTime()
    }, 1000)
  },
  beforeDestroy() {
    clearInterval(this.updateInterval as unknown as number)
  }
})
</script>
