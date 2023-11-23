import type { Meta, StoryObj } from '@storybook/react'
import { ForgotPassword } from '@/components/auth/forgot-password/forgot-password'

const meta = {
  component: ForgotPassword,
  tags: ['autodocs'],
  title: 'Auth/ForgotPassword',
} satisfies Meta<typeof ForgotPassword>

export default meta
type Story = StoryObj<typeof meta>

export const Primary: Story = {}
