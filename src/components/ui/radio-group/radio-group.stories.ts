import type { Meta, StoryObj } from '@storybook/react'

import { RadioGroup } from './'

const meta = {
  component: RadioGroup,
  tags: ['autodocs'],
  title: 'Components/RadioGroup',
} satisfies Meta<typeof RadioGroup>

export default meta
type Story = StoryObj<typeof meta>

const options = ['One', 'Two', 'Three']

export const Default: Story = {
  args: {
    defaultValue: options[0],
    disabled: false,
    options: options,
  },
}
