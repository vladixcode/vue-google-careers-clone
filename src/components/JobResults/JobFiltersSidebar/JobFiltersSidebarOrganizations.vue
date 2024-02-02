<template>
  <job-filters-sidebar-checkbox-group
    :unique-values="UNIQUE_ORGANIZATIONS"
    :action="userStore.ADD_SELECTED_ORGANIZATIONS"
  />
</template>

<script lang="ts" setup>
import { computed } from 'vue'
import JobFiltersSidebarCheckboxGroup from './JobFiltersSidebarCheckboxGroup.vue'

import { useUserStore } from '@/stores/user'
const userStore = useUserStore()

import { useJobsStore } from '@/stores/jobs'
const jobsStore = useJobsStore()
const UNIQUE_ORGANIZATIONS = computed(() => jobsStore.UNIQUE_ORGANIZATIONS)
</script>
