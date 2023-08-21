<template>
  <collapsible-accordion header="Job Types">
    <div class="md-5">
      <fieldset>
        <ul class="flex flex-row flex-wrap">
          <li v-for="jobType in UNIQUE_JOB_TYPES" :key="jobType" class="h-8 w-1/2">
            <input
              :id="jobType"
              v-model="selectedJobTypes"
              :value="jobType"
              type="checkbox"
              class="mr-3"
              @change="selectJobTypes"
            />
            <label :for="jobType">{{ jobType }}</label>
          </li>
        </ul>
      </fieldset>
    </div>
  </collapsible-accordion>
</template>

<script setup>
/**
 * TODO: Remove this component and its tests since it is no longer used
 *
 * There is more generic and reusable component
 * tests/unit/components/JobResults/JobResultsSidebar/JobFiltersSidebarCheckboxGroup.test.js
 */
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'

import { useJobsStore } from '@/stores/jobs'
import { useUserStore } from '@/stores/user'

import CollapsibleAccordion from '@/components/Shared/CollapsibleAccordion.vue'

const selectedJobTypes = ref([])

const jobStore = useJobsStore()
const UNIQUE_JOB_TYPES = computed(() => jobStore.UNIQUE_JOB_TYPES)

const userStore = useUserStore()
const router = useRouter()

const selectJobTypes = () => {
  userStore.ADD_SELECTED_JOB_TYPES(selectedJobTypes.value)
  router.push({ name: 'JobResults' })
}
</script>
