import { ComponentPropsWithoutRef } from 'react'

import * as Select from '@radix-ui/react-select'

import s from './select.module.scss'

export type TabType = {
  /** A unique value that associates the trigger with a content. */
  disabled?: boolean
  title: string
  value: string
}
type TabSwitcherProps = {
  className?: string
  label?: string
  tabs: TabType[]
} & ComponentPropsWithoutRef<typeof Select.Root>
export const SelectRadix = ({ className, label, tabs, ...rest }: TabSwitcherProps) => {
  return (
    <Select.Root>
      <Select.Trigger>
        <Select.Value />
        <Select.Icon />
      </Select.Trigger>

      <Select.Portal>
        <Select.Content>
          <Select.ScrollUpButton />
          <Select.Viewport>
            <Select.Item value={}>
              <Select.ItemText />
              <Select.ItemIndicator />
            </Select.Item>

            <Select.Group>
              <Select.Label />
              <Select.Item value={}>
                <Select.ItemText />
                <Select.ItemIndicator />
              </Select.Item>
            </Select.Group>

            <Select.Separator />
          </Select.Viewport>
          <Select.ScrollDownButton />
          <Select.Arrow />
        </Select.Content>
      </Select.Portal>
    </Select.Root>
  )
}
