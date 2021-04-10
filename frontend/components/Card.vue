<template lang="pug">
  v-card(style="position: relative")

    v-overlay(
      v-if="isLoading"
      absolute
    )
      v-row.fill-height
        v-col.fill-height.d-flex.flex-column.justify-center.align-center
          v-progress-circular(
            indeterminate
            size="100"
          )

    v-btn(
      v-if="!fresh"
      @click="cancelEdit"
      icon
    ).icon
      v-icon {{ !edit ? 'mdi-pen' : 'mdi-close' }}

    v-card-title(v-if="!edit") {{ data.lastName }} {{ data.firstName }} {{ data.middleName }}
    v-card-title(v-else)
      v-text-field(
        placeholder="Фамилия"
        v-model="data.lastName"
      )
      v-text-field(
        placeholder="Имя"
        v-model="data.firstName"
      ).mx-5
      v-text-field(
        placeholder="Отчество"
        v-model="data.middleName"
      )

    v-card-text
      h3.mb-2.ml-2 Номера телефонов
      div(
        v-for="phone in data.phones"
        :key="data.id + phone"
      ).d-flex.align-center
        div.text-subtitle-1 {{ phone }}
        v-btn(
          v-if="edit && data.phones.length > 0"
          @click="removeNumber(phone)"
          small
          icon
        )
          v-icon mdi-close
      div(v-if="edit")
        v-text-field(
          placeholder="Введите номер телефона"
          append-outer-icon="mdi-plus"
          v-model="newPhone"
          @keydown="clearErrors"
          @keydown.enter="addNewNumber"
          @click:append-outer="addNewNumber"
          :error="error.length > 0"
          :error-messages="error"
        )

    v-card-actions
      v-btn(
        v-if="edit"
        @click="fresh ? submit() : update()"
        color="primary"
        :disabled="!canSubmit"
        block
      ) Отправить
      div(v-else) Дата изменения: {{ updateTime }}
</template>

<script lang="ts">
import Vue, { PropType } from 'vue'
import { Entry, EntryDraft } from "~/assets/interfaces"

const DEFAULT_DATA = {
  lastName: '',
  firstName: '',
  middleName: '',
  phones: []
} as EntryDraft

export default Vue.extend({
  name: "Card",
  props: {
    entry: {
      type: Object as PropType<Entry>,
      default: (): Entry => DEFAULT_DATA as Entry
    },
    fresh: Boolean
  },
  data() {
    return {
      data: this.entry,
      isLoading: false,
      edit: this.fresh,
      error: '',
      newPhone: ''
    }
  },
  computed: {
    canSubmit(): boolean { return this.data.firstName.length > 0 && this.data.lastName.length > 0 && this.isDataModified },
    isDataModified(): boolean { return JSON.stringify(this.data) !== JSON.stringify(this.getInitialData()) },
    updateTime(): string {
      const date = new Date(this.data.updatedAt)
      return `${date.toLocaleDateString()} / ${date.toLocaleTimeString()}`
    }
  },
  methods: {
    clearErrors() {
      this.error = ''
    },
    cancelEdit() {
      this.edit = !this.edit
      this.data = this.getInitialData()
    },
    getInitialData() {
      let data = Object.assign({}, this.data, DEFAULT_DATA, this.entry)
      if (this.entry?.phones.length === 0) data.phones = []
      return data
    },
    addNewNumber() {
      if (this.data.phones.includes(this.newPhone)) return this.error = 'Такой номер уже существует'
      if (isNaN(parseInt(this.newPhone))) return this.error = 'Номер может состоять лишь из цифр'
      this.data.phones.push(parseInt(this.newPhone).toString()) // remove excess symbols // TODO: fix this - it is an unintended behaviour
      this.newPhone = ''
    },
    removeNumber(number: string) {
      this.data.phones = this.data.phones.filter(e => e !== number)
    },
    getPopulatedData() {
      return Object.assign({}, this.data, {
        createdAt: new Date(),
        updatedAt: new Date(),
        id: Math.floor(Math.random()*1000000)
      })
    },
    async submit() {
      this.isLoading = true
      await this.$axios.post('/api/cards', this.data)
        .then(() => {
          this.$emit('success', this.getPopulatedData())
          this.data = this.getInitialData()
        })
        .catch((error: Error) => {
          this.error = error.message
        })
      this.isLoading = false
    },
    async update() {
      this.isLoading = true
      await this.$axios.put(`/api/cards/${this.data.id}`, this.data)
        .then(() => {
          this.edit = false
        })
        .catch((error: Error) => {
          this.error = error.message
        })
      this.isLoading = false
    }
  },
  created() {
    this.data = this.getInitialData()
  }
})
</script>

<style lang="sass" scoped>
.icon
  position: absolute
  right: .2rem
  top: .2rem
</style>
