import type { Meta, StoryObj } from '@storybook/react'

import { ForgotPassword } from '@/components/auth/forgot-password/forgot-password'
import {Provider} from "react-redux";
import {store} from "@/services/store";
import {AuthProvider} from "@/assets/isAuthContext";
import {MemoryRouter} from "react-router-dom";

const meta = {
  component: ForgotPassword,
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
  title: 'Auth/ForgotPassword',
} satisfies Meta<typeof ForgotPassword>

export default meta
type Story = StoryObj<typeof meta>

export const Primary: Story = {}
