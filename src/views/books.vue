<template>
  <main style="margin-top: 2rem">
    <h1>Fetch books with Database Token</h1>

    ID of the books table: <input type="text" v-model="bookTableId" />
    <button @click="fetchBooks">Fetch books</button>

    <div v-if="error" style="color: red">Error: {{ error }}</div>
    <div v-else-if="isFetching" style="color: blue">Loading...</div>

    <section v-else>
      <div v-for="book in baserowBooks.results" :key="book.id">
        <img :src="book['Cover photo']?.[0]?.url" />
        <p>{{ book['Book title'] }}</p>
      </div>
    </section>
  </main>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useFetch } from '@vueuse/core'

const publicDatabaseToken = import.meta.env.VITE_BASEROW_DATABASE_TOKEN
const publicBaseUrl = import.meta.env.VITE_BASEROW_BASE_URL

const bookTableId = ref(646)
const baserowBooks = ref([])

const { execute, isFetching, data, error } = useFetch(
  computed(() => `${publicBaseUrl}/database/rows/table/${bookTableId.value}/?user_field_names=true`),
  {
    headers: { Authorization: `Token ${publicDatabaseToken}` },
  },
  { immediate: false },
).json()

async function fetchBooks() {
  await execute()
  baserowBooks.value = data.value
}
</script>

<style scoped>
section div {
  margin: 2rem 0;
}
section img {
  max-width: 20rem;
}
</style>
