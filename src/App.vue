<template>
  <div id="app">
    <component :is="layout">
      <router-view />
    </component>
  </div>
</template>

<script>
import EmptyLayout from "@/layouts/EmptyLayout";
import MainLayout from "@/layouts/MainLayout";
import axios from "axios";
import Vue from 'vue'
export default {
  computed: {
    layout() {
      return (this.$route.meta.layout || "empty") + "-layout";
    },
  },
  components: {
    EmptyLayout,
    MainLayout,
  },
  created: function () {
    this.$http.interceptors.response.use(undefined, (err) => {
      return new Promise((resolve, reject) => {
        if (err.status !== 401 && err.config && !err.config.__isRetryRequest) {
          this.$store.dispatch("logout")
        }
        throw err
      })
    })
  }
    
}
</script>

<style lang="scss">
@import "./assets/style.css";
</style>
