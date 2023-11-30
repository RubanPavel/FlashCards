import { FieldValues, useForm } from 'react-hook-form'

import { ControlInput } from '@/components/ui/controlled/controlInput'
import {ChangeEvent, useEffect, useState} from "react";
import {useGetSearchQuery} from "@/services/decks";

type FormValue = {
  search: string
}

type Props = {
  className?: string
  valueInput: (search: FieldValues) => void
}

export const SearchInput = ({ className, valueInput,  ...rest }: Props) => {
  const { control, setValue, watch} = useForm<FormValue>({
    defaultValues: {
      search: '',
    },
  })

  const [debouncedValue, setDebouncedValue] = useState<string | null>(null);


  useEffect(() => {
    console.log(1)
    const debounceTimeout = setTimeout(() => {
      if (debouncedValue !== null) {
        // TODO Поиск по карточкам
        const { data, error } = useGetSearchQuery({
          name: debouncedValue,
        });

        if (error) {
          console.error('Error:', error);
        }

        if (data) {
          // Обработка полученных данных
          console.log(data);
        }
        // console.log('Search data:', { search: debouncedValue });
        setDebouncedValue(null);
      }
    }, 1000);

    return () => clearTimeout(debounceTimeout);
  }, [debouncedValue]);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    console.log(2)
    setValue('search', e.currentTarget.value);
    console.log(e.currentTarget.value)
    setDebouncedValue(e.currentTarget.value);
  };

  valueInput(watch())

  return (
    <ControlInput
      {...rest}
      className={className}
      control={control}
      name={'search'}
      setValue={setValue as (name: string, value: string) => void}
      type={'search'}
      onChange={handleInputChange}
    />
  )
}
