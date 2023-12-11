import { Provider } from 'react-redux'
import { MemoryRouter } from 'react-router-dom'

import { store } from '@/services/store'
import { Meta, StoryObj } from '@storybook/react'

import { NotFoundPage } from './not-found-page'

const meta = {
  component: NotFoundPage,
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
  title: 'Page/NotFoundPage',
} satisfies Meta<typeof NotFoundPage>

export default meta
type Story = StoryObj<typeof meta>

export const NotFoundDefault: Story = {}
