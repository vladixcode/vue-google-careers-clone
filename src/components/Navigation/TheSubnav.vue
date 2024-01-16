<template>
  <div class="h-16 w-full border-b border-solid border-brand-blue-1 bg-white">
    <div class="flex h-full items-center px-8">
      <div v-if="onJobResultsPage">
        <font-awesome-icon :icon="['fas', 'search']" class="mr-3" />
        <span
          ><span class="text-brand-green-1">{{ FILTERED_JOBS.length }}</span> jobs matched</span
        >
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { useJobsStore } from '@/stores/jobs'

const jobStore = useJobsStore()

const route = useRoute()
const onJobResultsPage = computed(() => route.name === 'JobResults')
const FILTERED_JOBS = computed(() => jobStore.FILTERED_JOBS)
</script>
