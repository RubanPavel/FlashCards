import { Provider } from 'react-redux'

import { NamePack } from '@/components/packs/name-pack/namePack'
import { store } from '@/services/store'
import { Meta, StoryObj } from '@storybook/react'

const meta = {
  component: NamePack,
  decorators: [
    Story => (
      <Provider store={store}>
        <Story />
      </Provider>
    ),
  ],
  tags: ['auto-docs'],
  title: 'Components/Packs',
} satisfies Meta<typeof NamePack>

export default meta
type Story = StoryObj<typeof meta>

export const NamePackExample: Story = {}
