<template>
  <button
    class="rounded border-0 bg-brand-blue-1 px-5 py-3 font-medium text-white hover:shadow-blue"
  >
    {{ text }}
  </button>
</template>

<script>
export default {
  name: 'ActionButton',
  props: ['text'],
}
</script>

<style scoped>
button {
  /* Common CSS styles for all buttons */
}

.primary {
}

.secondary {
}
</style>
