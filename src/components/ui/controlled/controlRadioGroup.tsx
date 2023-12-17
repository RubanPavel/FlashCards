import { FieldValues, UseControllerProps, useController } from 'react-hook-form'

import { RadioGroup, RadioGroupProps } from '@/components/ui/radio-group'

type Props<T extends FieldValues> = UseControllerProps<T> & RadioGroupProps

export const ControlRadioGroup = <T extends FieldValues>({
  control,
  errorMessage,
  name,
  ...rest
}: Props<T>) => {
  const {
    field: { onChange, value },
  } = useController({ control, name })

  return <RadioGroup {...rest} errorMessage={errorMessage} onValueChange={onChange} value={value} />
}
