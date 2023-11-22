import {FieldValues, useController, UseControllerProps} from 'react-hook-form'
import {CheckboxProps, CheckboxRadix} from "@/components/ui/сheckbox";


export type ControlledCheckboxProps<T extends FieldValues> = UseControllerProps<T> & CheckboxProps

export const ControlledCheckbox = <T extends FieldValues>(
  {
    name,
    rules,
    shouldUnregister,
    control,
    defaultValue,
    disabled,
    ...checkboxProps
  }: ControlledCheckboxProps<T>) => {

  const {
    field: {onChange, value},
  } = useController({
    name,
    rules,
    shouldUnregister,
    control,
    defaultValue,
    disabled
  })

  return (
    <CheckboxRadix
      {...checkboxProps}
      checked={value}
      onValueChange={onChange}
      disabled={disabled}
    />
  )
}