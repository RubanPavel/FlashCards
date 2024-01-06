import type { Meta, StoryObj } from '@storybook/react'

import { TabContent, TabSwitcher } from './'

const meta = {
  argTypes: {
    tabs: {
      options: [],
    },
  },
  component: TabSwitcher,
  tags: ['autodocs'],
  title: 'Components/TabSwitcher',
} satisfies Meta<typeof TabSwitcher>

export default meta
type Story = StoryObj<typeof meta>

const tabs = [
  {
    id: '1',
    label: 'Tab1',
    value: 'TabSwitcher1',
  },
  {
    disabled: true,
    id: '2',
    label: 'Tab2',
    value: 'TabSwitcher2',
  },
  {
    id: '3',
    label: 'Tab3',
    value: 'TabSwitcher3',
  },
  {
    id: '4',
    label: 'Tab4',
    value: 'TabSwitcher4',
  },
]

const tabContents = tabs.map(tab => (
  <TabContent key={tab.id} value={tab.value}>
    Special information for {tab.label}
  </TabContent>
))

export const TabSwitcherWithDisabled: Story = {
  args: {
    children: tabContents,
    defaultValue: 'tab1',
    label: 'Title',
    tabs: tabs,
  },
}
