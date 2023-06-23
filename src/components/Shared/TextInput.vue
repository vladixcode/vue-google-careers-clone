<template>
  <input
    type="text"
    placeholder="Los Angeles"
    class="w-full text-lg font-normal focus:outline-none"
    :value="modelValue"
    @input="handleInput"
  />
</template>

<script>
export default {
  name: 'TextInput',
  props: {
    modelValue: {
      type: String,
      required: true,
    },
  },
  emits: ['update:modelValue'],
  methods: {
    handleInput($event) {
      this.$emit('update:modelValue', $event.target.value)
    },
  },
}
</script>
