import { ChangeEvent, ComponentPropsWithoutRef, useEffect, useState } from 'react'

import { Input } from '@/components/ui/input'

type Props = {
  callback: (value: string) => void
} & Omit<ComponentPropsWithoutRef<'input'>, 'onChange' | 'value'>

export const DebouncedInput = ({ callback, ...rest }: Props) => {
  const [debouncedValue, setDebouncedValue] = useState<null | string>(null)
  const [inputValue, setInputValue] = useState<string>('')

  useEffect(() => {
    const debounceTimeout = setTimeout(() => {
      if (debouncedValue !== null) {
        callback?.(debouncedValue)
        setDebouncedValue(null)
      }
    }, 500)

    return () => clearTimeout(debounceTimeout)
  }, [debouncedValue, callback])

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.currentTarget.value)
    setDebouncedValue(e.currentTarget.value)
  }

  const handleInputValue = (value: string) => {
    setInputValue(value)
    callback?.(value)
  }

  return (
    <Input {...rest} onChange={handleInputChange} setValue={handleInputValue} value={inputValue} />
  )
}
