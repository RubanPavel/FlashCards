import { ChangeEvent, useEffect, useState } from 'react'
import { FieldValues, useForm } from 'react-hook-form'

import { ControlInput } from '@/components/ui/controlled/controlInput'

type FormValue = {
  search: string
}

type Props = {
  className?: string
  setSearch?: (name: string) => void
  valueInput: (search: FieldValues) => void
}

export const SearchInput = ({ className, setSearch, valueInput, ...rest }: Props) => {
  const { control, setValue, watch } = useForm<FormValue>({
    defaultValues: {
      search: '',
    },
  })

  const [debouncedValue, setDebouncedValue] = useState<null | string>(null)

  useEffect(() => {
    const debounceTimeout = setTimeout(() => {
      if (debouncedValue !== null) {
        setSearch?.(debouncedValue)
        setDebouncedValue(null)
      }
    }, 500)

    return () => clearTimeout(debounceTimeout)
  }, [debouncedValue])

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setValue('search', e.currentTarget.value)
    setDebouncedValue(e.currentTarget.value)
  }

  // TODO предлагаю убрать
  valueInput(watch())

  return (
    <ControlInput
      {...rest}
      className={className}
      control={control}
      name={'search'}
      onChange={handleInputChange}
      setValue={setValue as (name: string, value: string) => void}
      type={'search'}
    />
  )
}
