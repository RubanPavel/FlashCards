import { useState } from 'react'

import { SliderRadix } from '@/components/ui/slider/slider'
import { Meta, StoryObj } from '@storybook/react'

const meta = {
  component: SliderRadix,
  tags: ['autodocs'],
  title: 'Components/Slider',
} satisfies Meta<typeof SliderRadix>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    value: [1, 10],
  },
  render: args => {
    const [valueSlider, setValueSlider] = useState<number[]>(args.value)

    return (
      <SliderRadix {...args} onValueChange={value => setValueSlider(value)} value={valueSlider} />
    )
  },
}
