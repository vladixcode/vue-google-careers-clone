<template>
  <div class="mt-2">
    <input
      v-model="skillSearchTerm"
      type="text"
      placeholder="Computer programming"
      class="h-12 w-full rounded border border-brand-gray-1 p-3 text-base shadow-gray"
    />
  </div>
</template>

<script lang="ts" setup>
import { computed } from 'vue'
import { useUserStore } from '@/stores/user'

const userStore = useUserStore()

const skillSearchTerm = computed({
  get() {
    return userStore.skillsSearchTerm
  },
  set(term) {
    userStore.UPDATE_SKILLS_SEARCH_TERM(term)
  },
})
</script>
