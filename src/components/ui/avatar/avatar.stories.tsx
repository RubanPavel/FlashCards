import { User } from '@/assets/userDataForTest'
import { AvatarRadix } from '@/components/ui/avatar/avatar'
import { Meta, StoryObj } from '@storybook/react'

const meta = {
  component: AvatarRadix,
  tags: ['autodocs'],
  title: 'Components/AvatarRadix',
} satisfies Meta<typeof AvatarRadix>

export default meta
type Story = StoryObj<typeof meta>

export const withImage: Story = {
  args: {
    imageUrl: User.avatar,
    userName: User.name,
  },
  render: args => {
    return <AvatarRadix imageUrl={args.imageUrl} userName={args.userName} />
  },
}

export const withoutImage: Story = {
  args: {
    imageUrl: '',
    userName: User.name,
  },
  render: args => {
    return <AvatarRadix imageUrl={args.imageUrl} userName={args.userName} />
  },
}
