<template>
  <img :src="imageLink" alt="User profile image" class="h-full rounded-3xl object-contain" />
</template>
<script lang="ts" setup>
import { ref } from 'vue'

const imageLink = ref(
  'https://i.fbcd.co/products/original/9847a67d09a39d0ef02f4cacc70490cdbe8cae2a1f7c9a2e5bf23e9a126137ec.jpg',
)
</script>
