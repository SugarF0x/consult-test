<template lang="pug">
  v-app

    v-navigation-drawer.d-md-none(
      v-model="drawer"
      right
      fixed
    )
      v-layout.fill-height(column)
        v-list.text-uppercase
          v-list-item(
            v-for="(link, index) in links"
            :key="link"
            :to="'/' + (index || '')"
            nuxt
            exact
          )
            v-list-item-content
              v-list-item-title(v-text="link")

    v-app-bar(app)
      router-link(
        to="/"
        style="text-decoration: none; color: inherit;"
      )
        v-toolbar-title Что делать Консалт - Тест
      v-spacer
      v-app-bar-nav-icon.d-md-none(@click.stop="drawer = !drawer")
      v-toolbar-items.d-none.d-md-flex(
        v-for="(link, index) in links"
        :key="link"
      )
        v-btn(
          :to="'/' + (index || '')"
          nuxt
          exact
        ) {{ link }}

    v-main
      v-container
        nuxt
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  name: 'layout-default',
  data() {
    return {
      drawer: false,
      links: [
        'Главная',
        'Задание 1',
        'Задание 2',
        'Задание 3',
        'Задание 4',
      ]
    }
  }
})
</script>
