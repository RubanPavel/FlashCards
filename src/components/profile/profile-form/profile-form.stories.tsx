import type { Meta, StoryObj } from '@storybook/react'

import { Provider } from 'react-redux'
import { MemoryRouter } from 'react-router-dom'

import { store } from '@/services/store'

import { ProfileForm } from './index'
import { User } from '@/assets/userDataForTest'

const meta = {
  component: ProfileForm,
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
  title: 'Profile/Profile/ProfileForm',
} satisfies Meta<typeof ProfileForm>

export default meta
type Story = StoryObj<typeof meta>

export const ProfileFormDefault: Story = {
  args: {
    user: User,
  },
}
