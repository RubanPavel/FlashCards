import type { Meta, StoryObj } from '@storybook/react'

import { CheckboxRadix } from './'

const meta = {
  component: CheckboxRadix,
  tags: ['autodocs'],
  title: 'Components/Checkbox',
} satisfies Meta<typeof CheckboxRadix>

export default meta

type Story = StoryObj<typeof meta>

export const CheckboxStoryDefault: Story = {
  args: {
    checked: true,
    disabled: false,
    title: 'Hello, I am Default',
  },
}

export const CheckboxStoryDisabled: Story = {
  args: {
    checked: true,
    disabled: true,
    title: 'Hello, I am Disabled',
  },
}
