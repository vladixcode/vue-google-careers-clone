<template>
  <div class="wrapper">
    <h1 class="m-5 text-center text-6xl">Hello</h1>
    <MainNav />
  </div>
</template>

<script>
import MainNav from '@/components/MainNav.vue'

export default {
  name: 'App',
  components: {
    MainNav,
  },
}
</script>
