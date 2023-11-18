import type { Meta, StoryObj } from '@storybook/react'

import { RadioGroup } from './'

const meta = {
  argTypes: {},
  component: RadioGroup,
  tags: ['autodocs'],
  title: 'Components/RadioGroup',
} satisfies Meta<typeof RadioGroup>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    defaultValue: 'Three',
    disabled: false,
    labels: [
      {
        id: '1',
        value: 'One',
      },
      {
        id: '2',
        value: 'Two',
      },
      {
        id: '3',
        value: 'Three',
      },
    ],
  },
}
