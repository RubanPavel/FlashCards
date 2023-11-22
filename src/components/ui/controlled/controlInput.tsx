import {Input} from "@/components/ui/input";
import {FieldValues, useController, UseControllerProps} from "react-hook-form";
import {ComponentPropsWithoutRef} from "react";

type Props<T extends FieldValues> = UseControllerProps<T> & ComponentPropsWithoutRef<typeof Input>

export const ControlInput = <T extends FieldValues>(
  {
    label,
    name,
    control,
    errorMessage,
    disabled,
    shouldUnregister,
    rules,
    defaultValue,
    ...rest
  }: Props<T>) => {

  const {
    field: {onChange, value},
  } = useController({
    name,
    control,
    disabled,
    shouldUnregister,
    rules,
    defaultValue
  })

  return <Input {...{
    ...rest,
    label,
    errorMessage,
    onChange,
    value
  }}/>
}