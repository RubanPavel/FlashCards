import { ReactNode } from 'react'

import * as TabsRadixUI from '@radix-ui/react-tabs'

import s from './tab-switcher.module.scss'

import { Typography } from '../typography/typography'

export type TabType = {
  disabled?: boolean
  title: string
  /** A unique value that associates the trigger with a content. */
  value: string
}
type TabSwitcherProps = {
  children?: ReactNode
  defaultValue?: string
  label?: string
  onValueChange?: (value: string) => void
  tabs: TabType[]
  value?: string
}
export const TabSwitcher = ({
  children,
  defaultValue,
  label,
  onValueChange,
  tabs,
  value,
}: TabSwitcherProps) => {
  return (
    <div>
      <Typography className={s.title} variant={'body-2'}>
        {label}
      </Typography>
      <TabsRadixUI.Root
        className={s.root}
        defaultValue={defaultValue}
        onValueChange={onValueChange}
        value={value}
      >
        <TabsRadixUI.List className={s.list}>
          {tabs.map(tab => {
            return (
              <TabsRadixUI.Trigger
                className={s.trigger}
                disabled={tab.disabled}
                key={tab.value}
                value={tab.value}
              >
                {tab.title}
              </TabsRadixUI.Trigger>
            )
          })}
        </TabsRadixUI.List>
        {children}
      </TabsRadixUI.Root>
    </div>
  )
}

export type TabContentProps = {
  children?: ReactNode
  /** A unique value that associates the trigger with a content. */
  value: string
}

export const TabContent = ({ children, value }: TabContentProps) => {
  return (
    <TabsRadixUI.Content className={s.content} value={value}>
      {children}
    </TabsRadixUI.Content>
  )
}
