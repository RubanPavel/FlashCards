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
    title: 'Switcher',
    value: 'tab1',
  },
  {
    disabled: false,
    title: 'Switcher2',
    value: 'tab2',
  },
  {
    title: 'Switcher3',
    value: 'tab3',
  },
]

export const Tabs: Story = {
  args: {
    children: (
      <>
        <TabContent value={tabs[0].value}>Content for Switcher.</TabContent>
        <TabContent value={tabs[1].value}>Content for Switcher2.</TabContent>
        <TabContent value={tabs[2].value}>Content for Switcher3.</TabContent>
      </>
    ),
    defaultValue: 'tab1',
    label: 'Title',
    tabs: tabs,
  },
}

export const TabsWithDisabled: Story = {
  args: {
    children: (
      <>
        <TabContent value={tabs[0].value}>Content for Switcher.</TabContent>
        <TabContent value={tabs[1].value}>Content for Switcher2.</TabContent>
        <TabContent value={tabs[2].value}>Content for Switcher3.</TabContent>
      </>
    ),
    defaultValue: 'tab1',
    label: 'Title',
    tabs: [
      {
        title: 'SwitcherA',
        value: 'tab1',
      },
      {
        disabled: true,
        title: 'SwitcherB',
        value: 'tab2',
      },
      {
        title: 'SwitcherC',
        value: 'tab3',
      },
    ],
  },
}
