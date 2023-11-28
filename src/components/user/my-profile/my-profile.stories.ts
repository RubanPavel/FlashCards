import type { Meta, StoryObj } from '@storybook/react'

import { MyProfile } from './'

const meta = {
  component: MyProfile,
  tags: ['autodocs'],
  title: 'User/MyProfile',
} satisfies Meta<typeof MyProfile>

export default meta
type Story = StoryObj<typeof meta>

export const EditProfileDefault: Story = {}
