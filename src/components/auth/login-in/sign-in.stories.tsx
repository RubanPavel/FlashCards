import type { Meta, StoryObj } from '@storybook/react'

import { SignIn } from '@/components/auth/login-in/sign-in'
import {Provider} from "react-redux";
import {store} from "@/services/store";
import {AuthProvider} from "@/assets/isAuthContext";
import {MemoryRouter} from "react-router-dom";

const meta = {
  component: SignIn,
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
  title: 'Auth/SignIn',
} satisfies Meta<typeof SignIn>

export default meta
type Story = StoryObj<typeof meta>

export const Primary: Story = {}
