import type { Meta, StoryObj } from '@storybook/react'

import { Provider } from 'react-redux'
import { MemoryRouter } from 'react-router-dom'

import { store } from '@/services/store'

import { SignIn } from './index'

const meta = {
  component: SignIn,
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
  title: 'Auth/SignIn',
} satisfies Meta<typeof SignIn>

export default meta
type Story = StoryObj<typeof meta>

export const Primary: Story = {}
