import { ChangeEvent, ComponentPropsWithoutRef, FC, useState } from 'react'
import { Typography } from '@/components/ui/typography/typography'

import s from './input.module.scss'
import { IconClose } from '@/components/ui/input/assets/IconClose'
import { IconEyeOutline } from '@/components/ui/input/assets/IconEyeOutline'
import { IconEyeOffOutline } from '@/components/ui/input/assets/IconEyeOffOutline'
import { IconSearch } from '@/components/ui/input/assets/IconSearch'

export type InputProps = {
  errorMessage?: string
  label?: string
  onChangeValue?: (value: string) => void
  search?: boolean
  value?: string
} & ComponentPropsWithoutRef<'input'>

export const Input: FC<InputProps> = props => {
  const { value, className, disabled, errorMessage, label, onChangeValue, search, type, ...rest } =
    props
  const [isInputTouched, setIsInputTouched] = useState(false)
  const [isPasswordVisible, setIsPasswordVisible] = useState<boolean>(false)

  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    onChangeValue?.(e.target.value)
    !isInputTouched && setIsInputTouched(true)
  }

  function handleBlur() {
    setIsInputTouched(false)
  }

  const onClearClick = () => {
    onChangeValue?.('')
  }

  const inputType = type === 'password' && isPasswordVisible ? 'text' : type
  const isShowClearButton = search && value?.length! > 0
  const colorIcon = isInputTouched ? 'var(--color-light-100)' : 'var(--color-dark-300)'
  const colorIconButton = disabled ? 'var(--color-dark-300)' : 'var(--color-light-100)'
  const classNameInput = `${s.input} ${isInputTouched && s.active} ${
    !isInputTouched && errorMessage && s.error
  } ${search && s.search} ${search && s.leftIcon} ${
    (type === 'password' || isPasswordVisible || isShowClearButton) && s.rightIcon
  }`

  return (
    <div aria-disabled={disabled} className={`${s.container} ${className}`}>
      {label && <label aria-disabled={disabled}>{label}</label>}
      <div className={s.wrapper}>
        {search && <IconSearch className={s.iconSearch} color={colorIcon} height={20} width={20} />}
        <input
          className={classNameInput}
          disabled={disabled}
          onChange={handleChange}
          value={value}
          type={inputType}
          onBlur={handleBlur}
          {...rest}
        />
        {isShowClearButton && (
          <button disabled={disabled} onClick={onClearClick}>
            <IconClose color={colorIconButton} height={20} width={20} />
          </button>
        )}
        {type === 'password' && (
          <button disabled={disabled} onClick={() => setIsPasswordVisible(!isPasswordVisible)}>
            {isPasswordVisible ? (
              <IconEyeOutline color={colorIconButton} height={20} width={20} />
            ) : (
              <IconEyeOffOutline color={colorIconButton} height={20} width={20} />
            )}
          </button>
        )}
      </div>
      {
        <Typography className={s.error} variant={'caption'}>
          {errorMessage || ''}
        </Typography>
      }
    </div>
  )
}
