import { Provider } from 'react-redux'

import { Decks, User } from '@/assets/dataForTest'
import { store } from '@/services/store'
import { Meta, StoryObj } from '@storybook/react'

import { Packs } from './packs'

const meta = {
  component: Packs,
  decorators: [
    Story => (
      <Provider store={store}>
        <Story />
      </Provider>
    ),
  ],
  tags: ['auto-docs'],
  title: 'Components/Packs',
} satisfies Meta<typeof Packs>

export default meta
type Story = StoryObj<typeof meta>

export const PacksExample: Story = {
  args: {
    decks: Decks,
    user: User,
  },
}
