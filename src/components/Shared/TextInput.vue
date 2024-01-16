<template>
  <input
    type="text"
    placeholder="Los Angeles"
    class="w-full text-lg font-normal focus:outline-none"
    :value="modelValue"
    @input="handleInput"
  />
</template>

<script lang="ts" setup>
defineProps({
  modelValue: {
    type: String,
    required: true,
  },
})

const emit = defineEmits(['update:modelValue'])

const handleInput = ($event: Event) => {
  const target = $event.target as HTMLInputElement
  emit('update:modelValue', target.value)
}
</script>
