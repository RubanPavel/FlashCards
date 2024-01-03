import { ChangeEvent, ComponentPropsWithoutRef, Dispatch, useEffect, useState } from 'react'

import { Input } from '@/components/ui/input'

type Props = {
  callback: (value: string) => void
  inputValue: string
  setInputValue: Dispatch<string>
} & Omit<ComponentPropsWithoutRef<'input'>, 'onChange' | 'value'>

export const DebouncedInput = ({ callback, inputValue, setInputValue, ...rest }: Props) => {
  const [debouncedValue, setDebouncedValue] = useState<null | string>(null)
  // const [inputValue, setInputValue] = useState<string>(defaultValue || '')
  // if (handleClearInput) {
  //   handleClearInput(setInputValue(''))
  // }

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
