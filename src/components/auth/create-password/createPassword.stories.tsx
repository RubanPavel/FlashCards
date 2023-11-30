import type { Meta, StoryObj } from '@storybook/react'

import { CreatePassword } from './createPassword'
import {Provider} from "react-redux";
import {store} from "@/services/store";
import {AuthProvider} from "@/assets/isAuthContext";
import {MemoryRouter} from "react-router-dom";

const meta = {
  component: CreatePassword,
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
  title: 'Auth/CreatePassword',
} satisfies Meta<typeof CreatePassword>

export default meta
type Story = StoryObj<typeof meta>

export const Primary: Story = {}
