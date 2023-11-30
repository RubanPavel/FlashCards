import type { Meta, StoryObj } from '@storybook/react'

import { Provider } from 'react-redux'
import { MemoryRouter } from 'react-router-dom'

import { AuthProvider } from '@/assets/isAuthContext'
import { ForgotPasswordCheckEmail } from '@/components/auth/forgot-password-checkEmail/forgotPasswordCheckEmail'
import { store } from '@/services/store'

const meta = {
  component: ForgotPasswordCheckEmail,
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
  title: 'Auth/ForgotPasswordCheckEmail',
} satisfies Meta<typeof ForgotPasswordCheckEmail>

export default meta
type Story = StoryObj<typeof meta>

export const Primary: Story = {}
