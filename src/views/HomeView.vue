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
import { useFetch } from '@vueuse/core'
const id = ref(1)
const url = computed(() => `https://jsonplaceholder.typicode.com/todos/${id.value}`)
const { execute, isFetching, data, error } = useFetch(url, { immediate: false })
</script>
