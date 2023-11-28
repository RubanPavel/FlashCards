import type { Meta, StoryObj } from '@storybook/react'

import { EditProfileForm } from './'

const meta = {
  argTypes: {
    variant: {
      options: ['Nickname', 'sAvatar'],
    },
  },
  component: EditProfileForm,
  tags: ['autodocs'],
  title: 'User/MyProfile/EditProfileForm',
} satisfies Meta<typeof EditProfileForm>

export default meta
type Story = StoryObj<typeof meta>

export const EditProfileFormNickname: Story = {
  args: {
    variant: 'nickname',
  },
}

export const EditProfileFormEmail: Story = {
  args: {
    variant: 'email',
  },
}

export const EditProfileFormAvatar: Story = {
  args: {
    variant: 'avatar',
  },
}
