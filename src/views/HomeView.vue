<template>
  <main>
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
const id = ref(1)

const useMyFetch = createFetch({
  baseUrl: '/.netlify/functions/',
})
const { execute, isFetching, data, error } = useMyFetch(
  computed(() => `/token-proxy?name=${id.value}`),
  {
    query: JSON.stringify({ name: 'foo' }),
    headers: {
      'Content-type': 'application/json; charset=UTF-8',
    },
  },
  { immediate: false },
).post()
</script>
