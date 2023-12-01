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

const tabContents = tabs.map(tab => (
  <TabContent key={tab.value} value={tab.value}>
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
