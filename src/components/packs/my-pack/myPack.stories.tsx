import { Provider } from 'react-redux'

import { Router } from '@/router'
import { store } from '@/services/store'
import { Meta, StoryObj } from '@storybook/react'

import { MyPack } from './'

const meta = {
  component: MyPack,
  decorators: [
    () => (
      <Provider store={store}>
        <Router />
      </Provider>
    ),
  ],
  tags: ['auto-docs'],
  title: 'Components/Packs',
} satisfies Meta<typeof MyPack>

export default meta
type Story = StoryObj<typeof meta>

export const MyPackExample: Story = {}
