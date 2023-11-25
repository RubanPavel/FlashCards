import type { Meta, StoryObj } from '@storybook/react'

import { EditProfile } from './'

const meta = {
  component: EditProfile,
  tags: ['autodocs'],
  title: 'User/EditProfile',
} satisfies Meta<typeof EditProfile>

export default meta
type Story = StoryObj<typeof meta>

export const EditProfileDefault: Story = {}
