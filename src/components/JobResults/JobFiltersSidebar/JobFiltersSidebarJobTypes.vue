<template>
  <job-filters-sidebar-checkbox-group
    :unique-values="UNIQUE_DEGREES"
    :action="userStore.ADD_SELECTED_DEGREES"
  />
</template>

<script lang="ts" setup>
import { computed } from 'vue'
import JobFiltersSidebarCheckboxGroup from './JobFiltersSidebarCheckboxGroup.vue'

import { useUserStore } from '@/stores/user'
const userStore = useUserStore()

import { useDegreesStore } from '@/stores/degrees'
const degreeStore = useDegreesStore()
const UNIQUE_DEGREES = computed(() => degreeStore.UNIQUE_DEGREES)
</script>
