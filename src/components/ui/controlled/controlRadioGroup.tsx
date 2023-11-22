import {RadioGroup, RadioGroupProps} from "@/components/ui/radio-group";
import {FieldValues, useController, UseControllerProps} from "react-hook-form";

type Props<T extends FieldValues> = UseControllerProps<T> & RadioGroupProps

export const ControlRadioGroup = <T extends FieldValues>(
  {name, control, ...rest}: Props<T>) => {

  const {
    field: {onChange, value},
  } = useController({name, control})

  return <RadioGroup {...rest} value={value} onValueChange={onChange}/>
}