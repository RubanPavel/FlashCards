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

const options = [
  { value: 'Select 1' },
  { disabled: true, value: 'Select 2' },
  { value: 'Select 3' },
]

export const SelectStoryWithDisabledItem: Story = {
  args: {
    /* defaultValue: options[0].value,*/
    label: 'Selectors test',
    placeholder: 'Select placeholder',
    selectOptions: options,
  },
}
