<template>
  <div class="md-5">
    <fieldset>
      <ul class="flex flex-row flex-wrap">
        <li v-for="value in uniqueValues" :key="value" class="h-8 w-1/2">
          <input
            :id="value"
            v-model="selectedValues"
            :value="value"
            type="checkbox"
            class="mr-3"
            @change="selectedValue"
          />
          <label :for="value">{{ value }}</label>
        </li>
      </ul>
    </fieldset>
  </div>
</template>

<script lang="ts" setup>
/**
 * TODO: Fix data duplication for JobFiltersSidebarJobTypes that now exist as local data in this component and in global state
 */
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useUserStore, CLEAR_USER_JOB_FILTER_SELECTIONS } from '@/stores/user'

const props = defineProps({
  uniqueValues: {
    type: [Set<string>, Array<string>],
    required: true,
  },
  action: {
    type: Function,
    required: true,
  },
})

const selectedValues = ref<string[]>([])
const router = useRouter()

const selectedValue = () => {
  props.action(selectedValues.value)
  router.push({ name: 'JobResults' })
}

const userStore = useUserStore()
userStore.$onAction(({ after, name }) => {
  after(() => {
    if (name === CLEAR_USER_JOB_FILTER_SELECTIONS) {
      selectedValues.value = []
    }
  })
})
</script>
