import { Provider } from 'react-redux'
import { MemoryRouter } from 'react-router-dom'

import { ContentLayout } from '@/components/layout/content-layout'
import { store } from '@/services/store'
import { Meta, StoryObj } from '@storybook/react'

const meta = {
  component: ContentLayout,
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
  title: 'Layout/ContentLayout',
} satisfies Meta<typeof ContentLayout>

export default meta
type Story = StoryObj<typeof meta>

export const ContentLayoutDefault: Story = {}
