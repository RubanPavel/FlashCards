import { Modals } from '@/components/ui/modals/modals'
import { Meta, StoryObj } from '@storybook/react'

const meta = {
  component: Modals,
  tags: ['autodocs'],
  title: 'Components/Modals',
} satisfies Meta<typeof Modals>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    children: <b>Content</b>,
    trigger: <button>click</button>,
  },
  parameters: {
    layout: 'centered',
  },
}
