import type { Meta, StoryObj } from '@storybook/react'

import { ForgotPasswordCheckEmail } from '@/components/auth/forgot-password-checkEmail/forgotPasswordCheckEmail'

const meta = {
  component: ForgotPasswordCheckEmail,
  tags: ['autodocs'],
  title: 'Auth/ForgotPasswordCheckEmail',
} satisfies Meta<typeof ForgotPasswordCheckEmail>

export default meta
type Story = StoryObj<typeof meta>

export const Primary: Story = {
  args: {
    callback: () => alert('OK'),
    email: 'example@mail.ru',
  },
}
