import {Meta, StoryObj} from "@storybook/react";
import AvatarRadix from "@/components/ui/avatar/avatar";

const meta = {
  component: AvatarRadix,
  tags: ['autodocs'],
  title: 'Components/AvatarRadix',
} satisfies Meta<typeof AvatarRadix>

export default meta
type Story = StoryObj<typeof meta>

export const withImage: Story = {
  args: {
    userName: 'User',
    imageUrl: "https://i.pinimg.com/736x/19/63/b2/1963b290b9856d479b432734029ff2ee.jpg"
  },
  render: (args) => {
    return <AvatarRadix imageUrl={args.imageUrl} userName={args.userName} />
  }
}

export const withoutImage: Story = {
  args: {
    userName: 'User',
    imageUrl: ""
  },
  render: (args) => {
    return <AvatarRadix imageUrl={args.imageUrl} userName={args.userName} />
  }
}