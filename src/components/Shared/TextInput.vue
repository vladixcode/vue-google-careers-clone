<template>
  <input
    type="text"
    placeholder="Los Angeles"
    class="w-full text-lg font-normal focus:outline-none"
    :value="value"
    @input="handleInput"
  />
</template>

<script>
export default {
  name: 'TextInput',
  props: {
    value: {
      type: String,
      required: true,
    },
  },
  methods: {
    handleInput($event) {
      this.$emit('handleInput', $event.target.value)
    },
  },
}
</script>
