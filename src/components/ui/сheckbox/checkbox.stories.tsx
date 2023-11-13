import type { Meta, StoryObj } from '@storybook/react'

import { useState } from 'react'

import { CheckboxRadix } from './'

const meta = {
  component: CheckboxRadix,
  tags: ['autodocs'],
  title: 'Components/Checkbox',
} satisfies Meta<typeof CheckboxRadix>

export default meta

type Story = StoryObj<typeof meta>

export const CheckboxStory: Story = {
  args: {},
  render: args => {
    const [checkedValue, setCheckedValue] = useState(false)

    return (
      <>
        <CheckboxRadix
          {...args}
          checked={checkedValue}
          onChange={() => setCheckedValue(!checkedValue)}
        />
      </>
    )
  },
}

export const CheckboxStoryDisabled: Story = {
  args: {
    checked: true,
    disabled: true,
  },
}

export const CheckboxStoryWithLabel: Story = {
  args: {
    label: 'Check-box',
  },
  render: args => {
    const [checkedValue, setCheckedValue] = useState(false)

    return (
      <>
        <CheckboxRadix
          {...args}
          checked={checkedValue}
          onChange={() => setCheckedValue(!checkedValue)}
        />
      </>
    )
  },
}
