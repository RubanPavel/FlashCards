import type { Meta, StoryObj } from '@storybook/react'

import { Select } from './'

const meta = {
  argTypes: {
    onValueChange: { action: 'select changes' },
    selectOptions: [],
  },
  component: Select,
  tags: ['autodocs'],
  title: 'Components/Select',
} satisfies Meta<typeof Select>

export default meta
type Story = StoryObj<typeof meta>

const options = [{ value: 'Select-box 1' }, { value: 'Select-box 2' }, { value: 'Select-box 3' }]

export const SelectStory: Story = {
  args: {
    defaultValue: 'Select-box 1',
    label: 'Select-box',
    placeholder: 'Select-box 1',
    selectOptions: options,
  },
}

export const SelectStoryWithDisabledItem: Story = {
  args: {
    defaultValue: 'Select-box 1',
    placeholder: 'Select-box 1',
    selectOptions: [
      { value: 'Select-box 1' },
      { disabled: true, value: 'Select-box 2' },
      { value: 'Select-box 3' },
    ],
  },
}

export const SelectStoryDisabled: Story = {
  args: {
    defaultValue: 'Select-box 1',
    disabled: true,
    label: 'Select-box',
    placeholder: 'Select-box 1',
    selectOptions: options,
  },
}
