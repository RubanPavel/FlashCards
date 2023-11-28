import { Provider } from 'react-redux'

import { PackFriend } from "@/components/packs/friend's-pack/packFriend"
import { store } from '@/services/store'
import { Meta, StoryObj } from '@storybook/react'

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
  title: 'Components/PackFriend',
} satisfies Meta<typeof PackFriend>

export default meta
type Story = StoryObj<typeof meta>

export const PackFriendExample: Story = {}
