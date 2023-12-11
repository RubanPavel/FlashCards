import { SliderRadix } from '@/components/ui/slider/slider'
import { Meta, StoryObj } from '@storybook/react'

const meta = {
  component: SliderRadix,
  tags: ['autodocs'],
  title: 'Components/Slider',
} satisfies Meta<typeof SliderRadix>

export default meta
type Story = StoryObj<typeof meta>

export const Primary: Story = {
  args: {
    max: 13,
    min: 0,
  },
}
