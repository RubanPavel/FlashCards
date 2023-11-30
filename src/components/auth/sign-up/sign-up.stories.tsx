import type { Meta, StoryObj } from '@storybook/react'

import { SignUp } from './sign-up'
import {Provider} from "react-redux";
import {store} from "@/services/store";
import {AuthProvider} from "@/assets/isAuthContext";
import {MemoryRouter} from "react-router-dom";

const meta = {
  component: SignUp,
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
  title: 'Auth/SignUp',
} satisfies Meta<typeof SignUp>

export default meta
type Story = StoryObj<typeof meta>

export const Primary: Story = {}
