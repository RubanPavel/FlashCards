import { ComponentPropsWithoutRef, ReactNode } from 'react'

import * as TabsRadixUI from '@radix-ui/react-tabs'
import clsx from 'clsx'

import s from './tab-switcher.module.scss'

import { Typography } from '../typography/typography'

export type TabType = {
  /** A unique value that associates the trigger with a content. */
  disabled?: boolean
  id: string
  value: string
}
type TabSwitcherProps = {
  className?: string
  label?: string
  tabs: TabType[]
} & ComponentPropsWithoutRef<typeof TabsRadixUI.Root>
export const TabSwitcher = ({
  className,
  defaultValue,
  label,
  tabs,
  ...rest
}: TabSwitcherProps) => {
  return (
    <div>
      <Typography className={s.title} variant={'body-2'}>
        {label}
      </Typography>
      <TabsRadixUI.Root className={clsx(s.root, className)} value={defaultValue} {...rest}>
        <TabsRadixUI.List className={s.list}>
          {tabs.map(tab => {
            return (
              <TabsRadixUI.Trigger
                className={s.trigger}
                disabled={tab.disabled}
                key={tab.id}
                value={tab.value}
              >
                <Typography style={{ whiteSpace: 'nowrap' }} variant={'body-1'}>
                  {tab.value}
                </Typography>
              </TabsRadixUI.Trigger>
            )
          })}
        </TabsRadixUI.List>
        {rest.children}
      </TabsRadixUI.Root>
    </div>
  )
}

export type TabContentProps = {
  /** A unique value that associates the trigger with a content. */
  children?: ReactNode
  value: string
}

export const TabContent = ({ children, value }: TabContentProps) => {
  return (
    <TabsRadixUI.Content className={s.content} value={value}>
      {children}
    </TabsRadixUI.Content>
  )
}
