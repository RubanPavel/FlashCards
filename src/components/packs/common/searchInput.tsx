import { FieldValues, useForm } from 'react-hook-form'

import { ControlInput } from '@/components/ui/controlled/controlInput'

type FormValue = {
  search: string
}

type Props = {
  className?: string
  valueInput: (search: FieldValues) => void
}

export const SearchInput = ({ className, valueInput, ...rest }: Props) => {
  const { control, setValue, watch } = useForm<FormValue>({
    defaultValues: {
      search: '',
    },
  })

  valueInput(watch())

  return (
    <ControlInput
      {...rest}
      className={className}
      control={control}
      name={'search'}
      // @ts-ignore
      setValue={setValue}
      type={'search'}
    />
  )
}
