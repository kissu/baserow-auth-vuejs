<template>
  <main>
    <div>env: {{ publicDatabaseToken }}</div>

    Change the ID: <input type="text" v-model="id" />
    <button @click="execute">execute</button>

    <br />
    <div v-if="error" style="color: red">Error: {{ error }}</div>
    <div v-else-if="isFetching" style="color: blue">loading...</div>
    <pre v-else>{{ data }}</pre>
  </main>
</template>

<script setup>
import { ref, computed } from 'vue'
import { createFetch } from '@vueuse/core'

const publicDatabaseToken = import.meta.env.VITE_BASEROW_DATABASE_TOKEN
const id = ref(1)

const useMyFetch = createFetch({
  baseUrl: 'http://localhost:8000/api',
})
const { execute, isFetching, data, error } = useMyFetch(
  computed(() => `/templates/install/189/29/async/`),
  {
    headers: {
      'Content-type': 'application/json; charset=UTF-8',
      Authorization:
        'JWT eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNjc5NDU1NjgyLCJpYXQiOjE2Nzk0NTUwODIsImp0aSI6ImRjOTY0MGViYWU2MjRiY2ViNjljMjg0YTZjMDQ0ZGY3IiwidXNlcl9pZCI6MX0.Hi3DxOgo2Xrqbo94YXIy6Wi480fcA9VHradpYKc4AZE',
    },
  },
  { immediate: false },
).post()
</script>
