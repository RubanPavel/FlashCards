import type { Meta, StoryObj } from '@storybook/react'

import { Provider } from 'react-redux'
import { MemoryRouter } from 'react-router-dom'

import { User } from '@/assets/dataForTest'
import { store } from '@/services/store'

import { Profile } from './index'

const meta = {
  component: Profile,
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
  title: 'Profile/Profile',
} satisfies Meta<typeof Profile>

export default meta
type Story = StoryObj<typeof meta>

export const Primary: Story = {
  args: {
    logout: () => console.log('logout'),
    user: User,
  },
}
