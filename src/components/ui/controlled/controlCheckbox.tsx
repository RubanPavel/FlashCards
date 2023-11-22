import { FieldValues, UseControllerProps, useController } from 'react-hook-form'

import { CheckboxProps, CheckboxRadix } from '@/components/ui/сheckbox'

export type ControlledCheckboxProps<T extends FieldValues> = UseControllerProps<T> & CheckboxProps

export const ControlledCheckbox = <T extends FieldValues>({
  control,
  defaultValue,
  disabled,
  name,
  rules,
  shouldUnregister,
  ...checkboxProps
}: ControlledCheckboxProps<T>) => {
  const {
    field: { onChange, value },
  } = useController({
    control,
    defaultValue,
    disabled,
    name,
    rules,
    shouldUnregister,
  })

  return (
    <CheckboxRadix
      {...checkboxProps}
      checked={value}
      disabled={disabled}
      onValueChange={onChange}
    />
  )
}
