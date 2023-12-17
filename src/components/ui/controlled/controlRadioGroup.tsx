import { FieldValues, UseControllerProps, useController } from 'react-hook-form'

import { RadioGroup, RadioGroupProps } from '@/components/ui/radio-group'

type Props<T extends FieldValues> = UseControllerProps<T> & RadioGroupProps

export const ControlRadioGroup = <T extends FieldValues>({ control, name, errorMessage, ...rest }: Props<T>) => {
  const {
    field: { onChange, value },
  } = useController({ control, name })

  return <RadioGroup {...rest} onValueChange={onChange} value={value} errorMessage={errorMessage} />
}
