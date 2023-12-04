import { ChangeEvent, ComponentPropsWithoutRef, useEffect, useState } from 'react'
import { Input } from "@/components/ui/input";

type Props = {
  callback: (name: string) => void
} & Omit<ComponentPropsWithoutRef<'input'>, 'value' | 'onChange'>

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
  }, [debouncedValue])

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.currentTarget.value)
    setDebouncedValue(e.currentTarget.value)
  }

  return (
      <Input
          {...rest}
          value={inputValue}
          onChange={handleInputChange}
          setValue={setInputValue}
      />
  )
}
