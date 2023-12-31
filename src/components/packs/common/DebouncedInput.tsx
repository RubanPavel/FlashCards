import { ChangeEvent, ComponentPropsWithoutRef, useEffect, useState } from 'react'

import { Input } from '@/components/ui/input'

type Props = {
  defaultValue?: string
  callback: (value: string) => void
} & Omit<ComponentPropsWithoutRef<'input'>, 'onChange' | 'value'>

export const DebouncedInput = ({ callback, defaultValue, ...rest }: Props) => {
  const [debouncedValue, setDebouncedValue] = useState<null | string>(null)
  const [inputValue, setInputValue] = useState<string>('')

  // TODO if временно что бы не сломать другие элементы которые используют DebouncedInput
  if (defaultValue) {
    useEffect(() => {
      setInputValue(defaultValue)
    }, [defaultValue])
  }

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
