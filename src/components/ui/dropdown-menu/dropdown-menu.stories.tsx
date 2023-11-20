import { Meta, StoryObj } from '@storybook/react'
import { DropdownMenuRadix } from '@/components/ui/dropdown-menu/dropdown-menu'

const meta = {
  argTypes: {
    mode: {
      options: ['with-avatar', 'without-avatar'],
    },
  },
  component: DropdownMenuRadix,
  tags: ['autodocs'],
  title: 'Components/DropdownMenuRadix',
} satisfies Meta<typeof DropdownMenuRadix>

export default meta
type Story = StoryObj<typeof meta>

export const DropDownMenuWithAvatar: Story = {
  parameters: {
    layout: 'centered',
  },
  args: {
    children: (
      <div
        style={{
          width: 50,
          height: 50,
          backgroundColor: 'red',
          borderRadius: '50%',
        }}
      ></div>
    ),
    mode: 'with-avatar',
    user: { userName: 'User', userEmail: 'user@gmail.com', imageUrl: 'www.user-image.com' },
  },
}

export const DropDownMenuWithoutAvatar: Story = {
  parameters: {
    layout: 'centered',
  },
  args: {
    children: (
      <div style={{ width: 50, height: 50, backgroundColor: 'red', borderRadius: '50%' }}></div>
    ),
    mode: 'without-avatar',
  },
}
