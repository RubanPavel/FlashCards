import { Provider } from 'react-redux'

import { store } from '@/services/store'
import { Meta, StoryObj } from '@storybook/react'

import { PackFriend } from './'

const meta = {
  component: PackFriend,
  decorators: [
    Story => (
      <Provider store={store}>
        <Story />
      </Provider>
    ),
  ],
  tags: ['auto-docs'],
  title: 'Components/Packs',
} satisfies Meta<typeof PackFriend>

export default meta
type Story = StoryObj<typeof meta>

export const PackFriendExample: Story = {}
