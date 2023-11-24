import { ComponentPropsWithoutRef } from 'react'
import { FieldValues, UseControllerProps, useController } from 'react-hook-form'

import { Input } from '@/components/ui/input'

type Props<T extends FieldValues> = UseControllerProps<T> & ComponentPropsWithoutRef<typeof Input>

export const ControlInput = <T extends FieldValues>({
  control,
  defaultValue,
  disabled,
  errorMessage,
  label,
  name,
  rules,
  shouldUnregister,
  ...rest
}: Props<T>) => {
  const {
    field: { onChange, value, onBlur },
  } = useController({
    control,
    defaultValue,
    disabled,
    name,
    rules,
    shouldUnregister,
  })

  return (
    <Input {...rest} value={value} errorMessage={errorMessage} label={label} onChangeValue={onChange} onBlur={onBlur}/>
  )
}
