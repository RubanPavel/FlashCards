import { Provider } from 'react-redux'
import { MemoryRouter } from 'react-router-dom'

import { store } from '@/services/store'
import { Meta, StoryObj } from '@storybook/react'

import { ConfirmEmail } from './index'

const meta = {
  argTypes: {
    trigger: {
      control: { type: 'radio' },
      options: [true, false],
    },
  },
  component: ConfirmEmail,
  decorators: [
    Story => (
      <Provider store={store}>
        <MemoryRouter>
          <Story />
        </MemoryRouter>
      </Provider>
    ),
  ],
  tags: ['autodocs'],
  title: 'Auth/ConfirmEmail',
} satisfies Meta<typeof ConfirmEmail>

export default meta
type Story = StoryObj<typeof meta>

export const Primary: Story = {
  args: {
    trigger: true,
  },
}
