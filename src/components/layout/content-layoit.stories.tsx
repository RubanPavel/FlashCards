import { Provider } from 'react-redux'
import { MemoryRouter } from 'react-router-dom'

import { AuthProvider } from '@/assets/isAuthContext'
import { ContentLayout } from '@/components/layout/content-layout'
import { store } from '@/services/store'
import { Meta, StoryObj } from '@storybook/react'

// ТОDO убрать AuthProvider
const meta = {
  component: ContentLayout,
  decorators: [
    Story => (
      <Provider store={store}>
        <AuthProvider>
          <MemoryRouter>
            <Story />
          </MemoryRouter>
        </AuthProvider>
      </Provider>
    ),
  ],
  tags: ['autodocs'],
  title: 'Layout/ContentLayout',
} satisfies Meta<typeof ContentLayout>

export default meta
type Story = StoryObj<typeof meta>

export const ContentLayoutDefault: Story = {}
