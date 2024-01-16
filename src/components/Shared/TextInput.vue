<template>
  <input
    type="text"
    placeholder="Los Angeles"
    class="w-full text-lg font-normal focus:outline-none"
    :value="modelValue"
    @input="handleInput"
  />
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'TextInput',
  props: {
    modelValue: {
      type: String,
      required: true,
    },
  },
  emits: ['update:modelValue'],
  methods: {
    handleInput($event: Event) {
      const target = $event.target as HTMLInputElement
      this.$emit('update:modelValue', target.value)
    },
  },
})
</script>
