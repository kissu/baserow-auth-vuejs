<template>
  <main style="margin-top: 2rem">
    <label>ID of the template to install</label>
    <br />
    <input type="text" v-model="templateId" />
    <button @click="installGivenTemplate">Install</button>

    <div v-if="error" style="color: red">Error: {{ error }}</div>
    <div v-else-if="isFetching" style="color: blue">loading...</div>

    <h2>Template info</h2>
    <section v-if="jobStatus">
      <p>Name: {{ jobStatus.response.template.name }}</p>
      <p>Progress: {{ jobStatus.response.progress_percentage }}%</p>
      <p v-if="jobStatus.response.state === 'finished'">You can now see your template installed in your Baserow! 🎊</p>
    </section>
  </main>
</template>

<script setup>
import { ref, computed, watch } from 'vue'
import { useFetch, useTimeoutPoll } from '@vueuse/core'
const proxyBaseUrl = import.meta.env.VITE_NETLIFY_FUNCTIONS_BASE_URL

// installing the template
const templateId = ref(6)
const payloadForProxy = computed(() => {
  return { templateId: templateId.value }
})

const {
  data: templateObject,
  error,
  execute: installGivenTemplate,
  isFetching,
  isFinished,
} = useFetch(`${proxyBaseUrl}/serverless-proxy/`, {
  immediate: false,
})
  .post(payloadForProxy)
  .json()

// tracking the job
const jobNumber = computed(() => {
  return { jobNumber: templateObject.value?.response?.id }
})

const {
  isFetching: isFetchingJob,
  data: jobStatus,
  execute: fetchJob,
} = useFetch(`${proxyBaseUrl}/track-specific-job/`, {
  immediate: false,
})
  .post(jobNumber)
  .json()

const fetchJobProgress = async () => {
  console.log('Installation in progress...')
  await fetchJob()
  if (jobStatus.value?.response?.state === 'finished') {
    stopJobTracking()
  }
}

// polling the API every second, https://vueuse.org/core/useTimeoutPoll/#usetimeoutpoll
const { resume: trackJob, pause: stopJobTracking } = useTimeoutPoll(fetchJobProgress, 1000)

watch(isFinished, (done) => {
  // once the request to install the template is done
  // we start polling the API to get the current status of the job
  if (done) trackJob()
})
</script>
