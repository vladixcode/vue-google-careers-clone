<template>
  <div class="mt-2">
    <input
      type="text"
      placeholder="Computer programming"
      class="h-12 w-full rounded border border-brand-gray-1 p-3 text-base shadow-gray"
    />
  </div>
</template>

<script lang="ts" setup>
import { useUserStore } from '@/stores/user'

const userStore = useUserStore()
</script>
