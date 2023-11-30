import { Provider } from 'react-redux'
import { MemoryRouter } from 'react-router-dom'
import { AuthProvider } from '@/assets/isAuthContext'
import type { Meta, StoryObj } from '@storybook/react'
import { MyProfile } from './'
import {store} from "@/services/store";


const meta = {
  component: MyProfile,
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
  title: 'User/MyProfile',
} satisfies Meta<typeof MyProfile>

export default meta
type Story = StoryObj<typeof meta>

export const EditProfileDefault: Story = {}
