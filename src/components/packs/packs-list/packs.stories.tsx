import { Provider } from 'react-redux'

import { store } from '@/services/store'
import { Meta, StoryObj } from '@storybook/react'

import { Packs } from './'
import { Router } from '@/router'

const meta = {
  component: Packs,
  decorators: [
    () => (
      <Provider store={store}>
        <Router />
      </Provider>
    ),
  ],
  tags: ['auto-docs'],
  title: 'Components/Packs',
} satisfies Meta<typeof Packs>

export default meta
type Story = StoryObj<typeof meta>

export const PacksExample: Story = {}
