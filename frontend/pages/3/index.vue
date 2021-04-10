<template lang="pug">
  div
    ToR(:doc="$options.name")
    v-row(justify="center")
      v-col(cols="12" sm="6")
        v-card(style="position: relative")
          v-overlay(
            v-if="!time"
            absolute
          )
            v-row.fill-height
              v-col.fill-height.d-flex.flex-column.justify-center.align-center
                v-progress-circular(
                  indeterminate
                  size="100"
                )
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
    try {
      this.time = new Date((await this.$axios.$get('/timezone/Europe/Moscow')).utc_datetime)
    } catch {
      this.time = new Date()
      this.formatTime()
    }
  },
  data() {
    return {
      time: null as null | Date,
      updateInterval: null as null | NodeJS.Timeout,

      formattedTime: '00:00:00',
      selectedTimezone: 'Europe/Moscow',
    }
  },
  methods: {
    formatTime() {
      this.formattedTime = intlFormat(
        utcToZonedTime(this.time as Date, this.selectedTimezone),
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
    if (this.time) this.formatTime()
    this.updateInterval = setInterval(() => {
      if (this.time) {
        this.time.setTime(this.time.getTime() + 1000)
        this.formatTime()
      }
    }, 1000)
  },
  beforeDestroy() {
    clearInterval(this.updateInterval as unknown as number)
  }
})
</script>
