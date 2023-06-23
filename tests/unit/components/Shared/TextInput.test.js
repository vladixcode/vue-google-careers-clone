import { render, screen } from '@testing-library/vue'
import userEvent from '@testing-library/user-event'

import TextInput from '@/components/Shared/TextInput.vue'

describe('TextInput', () => {
  it('comunicates that user has entered character', async () => {
    const wrapper = render(TextInput, {
      props: {
        modelValue: '',
      },
    })
    const input = screen.getByRole('textbox')
    const typeString = 'Vue'

    await userEvent.type(input, typeString)

    const [message] = wrapper.emitted()['update:modelValue'][typeString.length - 1]
    expect(message).toBe('Vue')
  })
})
