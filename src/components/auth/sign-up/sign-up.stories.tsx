import type { Meta, StoryObj } from '@storybook/react'

import { Provider } from 'react-redux'
import { MemoryRouter } from 'react-router-dom'

import { store } from '@/services/store'

import { SignUp } from './sign-up'

const meta = {
  component: SignUp,
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
  title: 'Auth/SignUp',
} satisfies Meta<typeof SignUp>

export default meta
type Story = StoryObj<typeof meta>

export const Primary: Story = {}
