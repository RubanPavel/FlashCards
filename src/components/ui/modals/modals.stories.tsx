import {Meta, StoryObj} from "@storybook/react";
import {Modals} from "@/components/ui/modals/modals";

const meta = {
  component: Modals,
  tags: ['autodocs'],
  title: 'Components/Modals',
} satisfies Meta<typeof Modals>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  parameters: {
    layout: 'centered'
  },
  args: {
    trigger: <button>click</button>,
    children: <b>Content</b>
  }
}