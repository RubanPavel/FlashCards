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
  setValue,
  shouldUnregister,
  ...rest
}: Props<T>) => {
  const {
    field: { onBlur, onChange, value },
  } = useController({
    control,
    defaultValue,
    disabled,
    name,
    rules,
    shouldUnregister,
  })

  return (
    <Input
      errorMessage={errorMessage}
      label={label}
      name={name}
      onBlur={onBlur}
      onChange={onChange}
      setValue={setValue}
      value={value}
      {...rest}
    />
  )
}
