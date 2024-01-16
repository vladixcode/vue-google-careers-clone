<template>
  <img :src="linkImage" alt="User profile image" class="h-full rounded-3xl object-contain" />
</template>
<script lang="ts">
import { defineComponent } from 'vue'

interface Data {
  linkImage: string
}

export default defineComponent({
  name: 'ProfileImage',
  data(): Data {
    return {
      linkImage:
        'https://i.fbcd.co/products/original/9847a67d09a39d0ef02f4cacc70490cdbe8cae2a1f7c9a2e5bf23e9a126137ec.jpg',
    }
  },
  methods: {
    changeImageLink() {
      this.linkImage = 'some other link'
    },
  },
})
</script>
