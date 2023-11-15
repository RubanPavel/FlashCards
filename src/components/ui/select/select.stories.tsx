import type { Meta, StoryObj } from '@storybook/react'

import { SelectRadix } from './'

const meta = {
  argTypes: {
    tabs: {
      options: [],
    },
  },
  component: SelectRadix,
  tags: ['autodocs'],
  title: 'Components/Select',
} satisfies Meta<typeof SelectRadix>

export default meta
type Story = StoryObj<typeof meta>

const tabs = [
  {
    label: 'Tab1',
    title: 'TabSwitcher1',
    value: 'tab1',
  },
  {
    disabled: true,
    label: 'Tab2',
    title: 'TabSwitcher2',
    value: 'tab2',
  },
  {
    label: 'Tab3',
    title: 'TabSwitcher3',
    value: 'tab3',
  },
  {
    label: 'Tab4',
    title: 'TabSwitcher4',
    value: 'tab4',
  },
]

export const TabSwitcherWithDisabled: Story = {
  args: {
    defaultValue: 'tab1',
    label: 'Title',
    tabs: tabs,
  },
}
